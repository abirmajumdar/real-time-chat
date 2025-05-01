import axios from "axios";
import { useEffect, useState, useRef } from "react"; // ✅ import useRef
import { useNavigate } from "react-router-dom";
import avater from '../assets/avatar.jpg';
import { BASE_URL } from "../utils/utils";
import { socket } from "../utils/socket"; // your socket instance

export default function DashBoardPage() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('User'));

  const messagesEndRef = useRef(null); // ✅ create a ref for bottom

  //  scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch users
  useEffect(() => {
    if(!loggedInUser) return ;
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/getusers/${loggedInUser._id}`);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch messages when user selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUserId) return;
      try {
        const response = await axios.get(`${BASE_URL}/message/getallmsg/${loggedInUser._id}/${selectedUserId}`);
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [selectedUserId]);

  // Socket: when app loads, register user
  useEffect(() => {
    if(!loggedInUser) return ;
      socket.emit('addUser', loggedInUser._id);
  }, [loggedInUser]);

  // Socket: listen for real-time messages
  if(loggedInUser){
    useEffect(() => {
        const handleReceiveMessage = (data) => {
          const { senderId, receiverId, message, createdAt } = data;
    
          if (
            (senderId === loggedInUser._id && receiverId === selectedUserId) ||
            (senderId === selectedUserId && receiverId === loggedInUser._id)
          ) {
            setMessages(prev => [...prev, { sender: senderId, receiver: receiverId, message, createdAt }]);
          }
        };
    
        socket.on('receiveMessage', handleReceiveMessage);
    
        return () => {
          socket.off('receiveMessage', handleReceiveMessage);
        };
      }, [selectedUserId, loggedInUser._id]);
  }

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("User");
      navigate('/');
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;
//     try {
//       await axios.post(`${BASE_URL}/message/sendchat`, {
//         senderId: loggedInUser._id,
//         receiverId: selectedUserId,
//         message: newMessage,
//       });

//       // Emit socket message after saving to db
//       socket.emit('sendMessage', {
//         senderId: loggedInUser._id,
//         receiverId: selectedUserId,
//         message: newMessage,
//       });

//       setMessages(prev => [...prev, { sender: loggedInUser._id, receiver: selectedUserId, message: newMessage }]);
//       setNewMessage('');
//     } catch (error) {
//       console.error(error);
//     }
//   };
const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post(`${BASE_URL}/message/sendchat`, {
        senderId: loggedInUser._id,
        receiverId: selectedUserId,
        message: newMessage,
      });
  
      // Just emit to socket (no need to push manually to messages)
      socket.emit('sendMessage', {
        senderId: loggedInUser._id,
        receiverId: selectedUserId,
        message: newMessage,
      });
  
      setNewMessage(''); // clear input
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-1/3 w-full bg-white border-r p-6 overflow-y-auto flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Logged In Users</h2>
          <button onClick={handleLogout}
            className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md text-sm transition">
            Logout
          </button>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUserId(user._id)}
              className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer ${selectedUserId === user._id ? "bg-blue-100" : "hover:bg-gray-100"}`}
            >
              <img src={avater} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
              <span className="text-gray-700 font-medium">{user.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {messages && messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === loggedInUser._id ? "justify-end" : "justify-start"}`}
            >
              <div className={`px-4 py-2 max-w-xs rounded-lg text-sm ${message.sender === loggedInUser._id ? "bg-blue-500 text-white" : "bg-white text-gray-800 border"}`}>
                {message.message}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* ✅ auto scroll anchor */}
        </div>

        {/* Input */}
        {selectedUserId && (
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
