import React from "react";

const users = [
  { id: 1, name: "John Doe", lastMessage: "Hey, how's it going?", time: "10:30 AM", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Jane Smith", lastMessage: "Let's catch up soon!", time: "9:15 AM", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Alice Johnson", lastMessage: "Meeting at 3 PM.", time: "Yesterday", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Bob Brown", lastMessage: "Sent you the files.", time: "Monday", avatar: "https://i.pravatar.cc/150?img=4" },
];

const Userlist = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white text-xl font-bold shadow-md">
        Chats
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-4 border-b bg-white hover:bg-gray-100 cursor-pointer transition"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">{user.name}</h2>
                <span className="text-xs text-gray-400">{user.time}</span>
              </div>
              <p className="text-gray-600 text-sm truncate">{user.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Userlist;
