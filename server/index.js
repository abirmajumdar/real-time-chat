const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./Routes/authRoute');
const messageRoute = require('./Routes/messageRoute');

const { Server } = require('socket.io');
const { createServer } = require('node:http');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server to enable WebSocket
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow any frontend origin
    methods: ["GET", "POST"],
  },
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Track online users
let onlineUsers = new Map();

// --- Socket.io Real-Time Logic ---
io.on('connection', (socket) => {
  console.log('🔵 New socket connected:', socket.id);

  // When user connects, store their ID with their socket
  socket.on('addUser', (userId) => {
    if (userId) {
      onlineUsers.set(userId, socket.id);
      console.log(`🟢 User ${userId} added with socket ${socket.id}`);
    }
  });

  // When a message is sent
  socket.on('sendMessage', ({ senderId, receiverId, message }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      // Send message to receiver
      io.to(receiverSocketId).emit('receiveMessage', {
        senderId,
        receiverId,
        message,
        createdAt: new Date(), // optional timestamp
      });
    }

    // Also send back to sender so sender also sees immediately
    socket.emit('receiveMessage', {
      senderId,
      receiverId,
      message,
      createdAt: new Date(),
    });
  });

  // When user disconnects
  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
    for (const [userId, sId] of onlineUsers.entries()) {
      if (sId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

// API Routes
app.use('/auth', authRoute);
app.use('/message', messageRoute);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: "🚀 API is running" });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
