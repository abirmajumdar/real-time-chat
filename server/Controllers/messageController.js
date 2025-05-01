const Message = require('../models/messageModel');

// Assuming io is passed or imported globally
let io; // Define a placeholder for socket.io server

// This is where the io instance will be initialized
// Set io instance in your server.js
const setIoInstance = (socketIoInstance) => {
  io = socketIoInstance;
};

const sendChat = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await new Message({
      sender: senderId,
      receiver: receiverId,
      message: message,
    });

    await newMessage.save();

    // Emit the message to the receiver
    if (io) {
      io.to(receiverId).emit('receiveMessage', newMessage);  // Broadcasting to the receiver's socket
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
    }).sort({ createdAt: 1 }); // Sort in chronological order

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { sendChat, getAllMessages, setIoInstance };
