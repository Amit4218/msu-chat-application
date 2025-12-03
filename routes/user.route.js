import { Router } from "express";
import {
  createGroupChatRoom,
  createSingleChatRoom,
  getChatRooms,
  getUserChatRoomMessages,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/create-chatRoom", createSingleChatRoom);

router.post("/create-group-chatRoom", createGroupChatRoom);

router.get("/get-chatRooms", getChatRooms);

router.get("/messages/:id", getUserChatRoomMessages);

router.put("/update-profile", updateUserProfile);

export default router;
