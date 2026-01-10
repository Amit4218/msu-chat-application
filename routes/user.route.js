import { Router } from "express";
import {
  createGroupChatRoom,
  createSingleChatRoom,
  findNewUserFromSearch,
  getChatRooms,
  getUserChatRoomMessages,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/create-chatRoom", createSingleChatRoom);

router.post("/create-group-chatRoom", createGroupChatRoom);

router.get("/get-chatRooms", getChatRooms);

router.get("/messages/:roomId", getUserChatRoomMessages);

router.get("/find/:search", findNewUserFromSearch);

router.put("/update-profile", updateUserProfile);

export default router;
