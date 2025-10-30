import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { FRONTEND_BASE_URL, PORT } from "./utils/envProvide.js";
import authRoutes from "./routes/auth.route.js";
import authTokenmiddleware from "./middleware/auth.middleware.js";

const app = express();
const port = PORT;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [`${FRONTEND_BASE_URL}`],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.emit("user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(express.json());
app.use(cors({ origin: [`${FRONTEND_BASE_URL}`] }));

app.use("/api/v1/auth", authRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
