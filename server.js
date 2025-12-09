import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { FRONTEND_BASE_URL, PORT } from "./utils/envProvide.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import authTokenmiddleware from "./middleware/auth.middleware.js";
import {
  blockUserFromChat,
  saveUserChatMessage,
} from "./controllers/user.controller.js";

const app = express();
const port = PORT;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [`${FRONTEND_BASE_URL}`, "*"],
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ roomId }) => {
    console.log("new user joined");

    socket.join(roomId);
  });

  socket.on("message", ({ roomId, message, senderId, senderName }) => {
    saveUserChatMessage(roomId, message, senderId, senderName); // fn to save the user sent message
    io.to(roomId).emit("message", { roomId, message, senderId, senderName });
  });

  socket.on("block", ({ roomId, status, userId }) => {
    blockUserFromChat(roomId, status, userId); // fn to block & unblock the user depending on status
    io.to(roomId).emit("block", { status: status, userId: userId });
  });

  socket.on("typing", (roomId) => {
    io.to(roomId).emit("typing", "typing...");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(express.json());
app.use(cors({ origin: [`${FRONTEND_BASE_URL}`, "*"] }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", authTokenmiddleware, userRoutes);
app.get("/root", (req, res) => {
  return res.status(200).json({ message: "Backend is up and running" });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
