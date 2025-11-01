import { Router } from "express";
import {
  createGroupChatRoom,
  createSingleChatRoom,
  getChatRooms,
  getUserChatRoomMessages,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/create-chatRoom", createSingleChatRoom);

router.post("/create-group-chatRoom", createGroupChatRoom);

router.get("/get-chatRooms", getChatRooms);

router.get("/messages", getUserChatRoomMessages);

export default router;
