import prisma from "../lib/prisma.js";

export const createSingleChatRoom = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // find if the room already exists

    const existingRoom = await prisma.singleChatRoom.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId,
        },
      },
    });

    if (existingRoom) {
      return res.status(409).json({
        message: "room already exist",
      });
    }

    // find the users and create the chatroom

    const sender = await prisma.user.findUnique({
      where: { id: senderId },
      select: { name: true, imageUrl: true, id: true, bio: true },
    });

    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
      select: { name: true, imageUrl: true, id: true, bio: true },
    });

    const singleChatRoom = await prisma.singleChatRoom.create({
      data: {
        receiverId: receiver.id,
        senderId: sender.id,
      },
    });

    // sort all the data in one place

    const finalSingleChatRoom = {
      ...singleChatRoom,
      senderName: sender.name,
      senderBio: sender.bio,
      senderImage: sender.imageUrl,
      receiverName: receiver.name,
      receiverImage: receiver.imageUrl,
      receiverBio: receiver.bio,
    };

    return res.status(200).json({
      message: "chatRoom created successfully",
      chatRoom: finalSingleChatRoom,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createGroupChatRoom = async (req, res) => {
  try {
    const { roomAdminId, participants, roomName } = req.body;

    const groupChatRoom = await prisma.groupChatRoom.create({
      data: {
        roomName,
        roomAdmin: {
          connect: { id: roomAdminId },
        },
        participants: {
          connect: participants.map((id) => ({ id })),
        },
      },
      include: {
        participants: {
          select: {
            name: true,
            imageUrl: true,
            bio: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Group created successfully",
      groupChatRoom: groupChatRoom,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getChatRooms = async (req, res) => {
  try {
    const userId = req.user.id;

    // get all the one-to-on chatrooms of the user

    const singleChatRoom = await prisma.singleChatRoom.findMany({
      where: { OR: [{ senderId: userId }, { receiverId: userId }] },
      include: {
        sender: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
        receiver: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    // get all the chatrooms of the user where he is a participant

    const groupChatRoom = await prisma.groupChatRoom.findMany({
      where: {
        OR: [
          { participants: { some: { id: userId } } },
          { roomAdminId: userId },
        ],
      },
      include: {
        participants: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    const userChatRooms = { singleChatRoom, groupChatRoom };

    return res.status(200).json({
      message: "chatRoom fetched successfull",
      userChatRooms: userChatRooms,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserChatRoomMessages = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const chatRoomMessages = await prisma.messages.findMany({
      where: {
        roomId: roomId,
        AND: {
          singleChatRoom: {
            blocked: false,
          },
        },
      },
    });

    return res.status(200).json({
      message: "chatRoom messages fetched successfull",
      chatRoomMessages: chatRoomMessages,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const findNewUserFromSearch = async (req, res) => {
  try {
    const search = req.params.search;
    const userId = req.user.id;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: search,
          },
          {
            registrationNo: search,
          },
          {
            phoneNumber: search,
          },
        ],
      },
      select: {
        id: true,
        email: true,
        imageUrl: true,
        name: true,
        bio: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found!",
      });
    }

    if (userId == user.id) {
      return res.status(400).json({
        message: "cannot serach yourself",
      });
    }
    return res.status(200).json({
      messsage: "user found",
      User: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const saveUserChatMessage = async (
  roomId,
  message,
  senderId,
  senderName
) => {
  try {
    await prisma.messages.create({
      data: {
        message,
        roomId,
        senderName,
        sender: { connect: { id: senderId } },
      },
    });

    return;
  } catch (error) {
    console.error("Error saving message:", error.message);
    throw new Error("Failed to save message");
  }
};

export const blockUserFromChat = async (roomId, status, userId) => {
  try {
    // block the user

    if (status) {
      await prisma.singleChatRoom.update({
        where: {
          id: roomId,
        },
        data: {
          blocked: userId,
        },
      });
    }

    // unblock the user

    await prisma.singleChatRoom.update({
      where: {
        id: roomId,
      },
      data: {
        blocked: null,
      },
    });

    return;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to block user");
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { bio, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { bio, phoneNumber: phone },
    });

    const { password: _, ...updatedUser } = user;

    return res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile: ", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};
