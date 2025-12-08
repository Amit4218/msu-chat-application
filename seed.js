import { studentData } from "./sampeData/student.js";
import { staffData } from "./sampeData/staff.js";
import { singleChatRoom } from "./sampeData/singleChatroom.js";
import { groupChatRoom } from "./sampeData/groupChatroom.js";

const seedUserData = async (user, userType) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();
    console.log(` ${userType} ${user.name} seeded successfully`);
    return data;
  } catch (error) {
    console.error(`Failed to seed ${userType} ${user.name}:`, error.message);
    throw error;
  }
};

const createChatrooms = async (chatRoom) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/user/create-chatRoom",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "brearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtaXQuMjNAbXN1LmVkdS5pbiIsImlkIjoiNjNlODVkMTQtZmQwOC00MDkxLWFkM2ItYWNiZjc5YmVjMjcwIiwiaWF0IjoxNzY1MDk2MTk5LCJleHAiOjE3Njc2ODgxOTl9.UFe-skUCbOxXB2f2ZO5ym8MUYtGPJQ4Y3UwLhtmr7yk",
        },
        body: JSON.stringify(chatRoom),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();
    console.log(`Single Chatroom creation successfull`);
    return data;
  } catch (error) {
    console.error(`Failed to create single chatroom`);
    throw error;
  }
};

const createGroupChatRoom = async (chatRoom) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/user/create-group-chatRoom",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "brearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtaXQuMjNAbXN1LmVkdS5pbiIsImlkIjoiNjNlODVkMTQtZmQwOC00MDkxLWFkM2ItYWNiZjc5YmVjMjcwIiwiaWF0IjoxNzY1MDk2MTk5LCJleHAiOjE3Njc2ODgxOTl9.UFe-skUCbOxXB2f2ZO5ym8MUYtGPJQ4Y3UwLhtmr7yk",
        },
        body: JSON.stringify(chatRoom),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();
    console.log(`Single Chatroom creation successfull`);
    return data;
  } catch (error) {
    console.error(`Failed to create single chatroom`);
    throw error;
  }
};

const startSeedingData = async () => {
  console.log("\t\tSEEDING DATA");

  console.log("Student Data Seeding started");
  for (const student of studentData) {
    await seedUserData(student, "Student");
  }

  console.log("Staff Data Seeding started");
  for (const staff of staffData) {
    await seedUserData(staff, "Staff");
  }

  console.log("Creating Single Chatroom");
  for (const chatRoom of singleChatRoom) {
    await createChatrooms(chatRoom);
  }

  console.log("Creating Group Chatroom");
  for (const chatroom of groupChatRoom) {
    await createGroupChatRoom(chatroom);
  }

  console.log("Data seeding completed");
};

startSeedingData().catch(console.error);
