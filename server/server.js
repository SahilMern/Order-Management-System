console.log("JAI SHREE RAM JI / JAI BAJARANG BALI JI💖😍");
import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.frontendUrl,
    credentials: true
  }
});

// Store connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle user authentication
  socket.on('authenticate', (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} connected`);
  });

  socket.on('disconnect', () => {
    // Remove from connected users
    for (let [userId, sockId] of connectedUsers.entries()) {
      if (sockId === socket.id) {
        connectedUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

//TODO:- Cors SetUp
app.use(
  cors({
    origin: process.env.frontendUrl,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

//? Route Imported
import authRoutes from "./routes/Auth.routes.js";
import productRoutes from "./routes/Product.routes.js";
import orderRoutes from "./routes/Order.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/orders", orderRoutes);

// Make io accessible in routes
app.set('io', io);

const PORT = process.env.PORT || 9022;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));