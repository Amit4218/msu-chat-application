## Base URL: for backend request

- `http://localhost:8080/api/v1`

### Routes

### Authentication

`POST: /auth/login : log the user in`

##### Data expected:

- email: User msu email
- password: password used during authentication

##### Returns

- message: "logged in successfully",<br>
- user: user information,<br>
- token: jwt auth token,

`POST: /auth/register : to add a new user`

##### Data expected:

- name: Name of the user,
- email: Their msu email,
- password: Their chosen password
- registrationNo: Their college registration number,
- phoneNumber: Their phone number (optional)
- semester: Current semester (optional)
- department: Their registered department (optional)
- gender: male | female | other
- userRole: student (default) | staff
- degsination: For teacher (optional)

##### Returns

- message: "user registered successfully",
- And sents otp to the user email

`POST: /auth/verify-otp : verification otp to verify their email`

##### Data expected:

- email: User msu email user for the current registeration
- otp: The 6 digit otp sent in the email

##### Returns

- message: "otp matched",
- user: user information,<br>
- token: jwt auth token,

`POST: /auth/logout : logout the user from the session`

##### Data expected:

- token: the jwt token

##### Returns

- message: "User logged out",

### User Actions

`POST: /user/create-chatRoom: creates a 1-1 chatroom `

##### Data expected:

- senderId: The id of user creating the room,
- receiverId: The id of user he want to make the room with

##### Returns

- message: "chatRoom created successfully",
- chatRoom: details of the room and both user,

`POST: /user/create-group-chatRoom: creates a 1-M chatroom`

##### Data expected:

- roomAdminId: The id of the user who wants to create the group,
- participants: List of all the user id who is being added to the group,
- roomName: Name for the group

##### Returns

- message: "Group created successfully",
- groupChatRoom: details of user & participents name, profile_img & bio

`GET: /user/get-chatRooms: fetches all the user chatrooms`

##### Data expected:

- No DATA is excepted

##### Returns

- message: "chatRoom fetched successfull",
- userChatRooms: list of all the user single & group chatrooms

`GET: /user/find/:email || registrationNo || phoneNo: searches for the user`

##### Data expected:

- No DATA is excepted

##### Returns

- message: "user found",
- user: necessary details to create a room.

`GET: /user/messages/:id: fetches all the messages from selected chatroom`

##### Data expected:

- No DATA is excepted

##### Returns

- message: "chatRoom fetched successfull",
- chatRoomMessages: list of all the messages from the chatroom,

`PUT: /user/update-profile: Updates the user profile information`

##### Data expected:

- name: will need the name even if its not changed,
- bio: will need the bio even if its not changed,
- phone: will need the phone even if its not changed,
- semester: will need the semester even if its not changed,
- designation: will need the designation even if its not changed

##### Returns

- message: "User profile updated successfully",
- user: the user with the updated value,

### Socket.io events

- `event: joinRoom: this will connect put the user into a chatroom`

```javaScript

  socket.on("joinRoom", ({ roomId }) => {
    console.log("new user joined");
    socket.join(roomId);
```

- `event: message: this will send the message into the user current chat room`

```javaScript

  socket.on("message", ({ roomId, message, senderId, senderName }) => {
    saveUserChatMessage(roomId, message, senderId, senderName); // fn to save the user sent message
    io.to(roomId).emit("message", { roomId, message, senderId, senderName });
  });
```

- `event: block: this will block the opposite user only for 1-1 chatroom`

- `params: roomId, status, userId`

```javaScript

    // status: refers to the action block or unblock
    // userId: id of the user

  socket.on("block", ({ roomId, status, userId }) => {
    blockUserFromChat(roomId, status, userId); // fn to block & unblock the user depending on status
    io.to(roomId).emit("block", { status: status, userId: userId });
  });
```

- `event: typing: this will get fired when the user focus on the input box`

- `params: roomId // id of the current selected room`

```javaScript
  socket.on("typing", (roomId) => {
    io.to(roomId).emit("typing", "typing...");
  });
```

- `event: stopTyping: indicates the user has stoped typing`

- `params: roomId // id of the current selected room`

```javaScript
  socket.on("stopTyping", ({ roomId }) => {
    io.to(roomId).emit("stopTyping", { roomId });
  });
```

### Request Examples

- `Base Request structure`

```javaScript

import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1"

const apiFunction = async (request_body_agruments) => {
    try{
                    // action can differ
        const res = await axios.post(`${BASE_URL}/your/endpoint`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"jwt_token" // not required when logging or register
            },
            body:{
                // the body as per the request
            }
        })
    }catch(error){
        console.error("Error hitting request": error)
    }
}
```

- `Route: /auth/login`

```javaScript
    body:{
        email:"a.23@msu.edu.in",
        password:"password"
    }
```

- `Route: /auth/register`

```javaScript
    body:{
        name: "userName",
        email:"a.23@msu.edu.in",
        password:"password"
        registrationNo:"1234567890", // can be empty for staff
        phoneNumber: "1234567890",
        semester:"6", // can be empty for staff
        department:"BCA FS" // should be in a structure like this
        gender:"MALE", // needs to be in full caps
        userRole:"STUDENT", // or STAFF need to be in full caps
        degsination:"IT FACULTY",
    }
```

- `Route: /auth/verify-otp`

```javaScript
    body:{
        email:"a.23@msu.edu.in", // save this in localstorage when register so u can send during otp verification
        otp:"000000"
    }
```

- `Route: /auth/logout`

```javaScript
    headers:{
        "Content-Type":"application/json",
        "Authorization":"jwt_token" // make sure you have this
    },
    body:{
        // no need for the body
    }
```

- `Route: /user/create-chatRoom`

```javaScript
    body:{
        senderId:"1dG4-4wk1-b3a9",
        receiverId:"09f8-2wQ5-4S32"
    }
```

- `Route: /user/create-group-chatRoom`

```javaScript
    body:{
        roomAdminId:"1dG4-4wk1-b3a9",
        participants:["09f8-2wQ5-4S32","1dG4-4wk1-b3a9","78wd-asd2-o2r4"],
        roomName:"Mygroup"
    }
```

- `Route: /user/get-chatRooms`

```javaScript
    headers:{
        "Content-Type":"application/json",
        "Authorization":"jwt_token" // make sure you have this
    },
    body:{
        // no need for the body
    }
```

- `Route: /user/messages/72RE-QWER-82PW`

```javaScript
    headers:{
        "Content-Type":"application/json",
        "Authorization":"jwt_token" // make sure you have this
    },
    body:{
        // no need for the body
    }
```

- `Route: /user/update-profile`

```javaScript

    // this all info should be sent even if only thing is updated to keep it from going null in db.

    body:{
        name:"userName",
        bio:"i am using msu chat",
        phone:"1234567890",
        semester:"6", // empty for staff
        designation:"IT FACULTY" // empty for student
    }
```
