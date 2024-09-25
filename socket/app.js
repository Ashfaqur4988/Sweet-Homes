import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];
//adding the user in the active list
const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
  }
};

//removing user from list after disconnecting
const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

//finding user id then taking the user's socket id we can send direct message.
const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //   console.log(socket.id);
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(onlineUser);
  });

  //receiving message for sendMessage event
  socket.on("sendMessage", ({ receiverId, data }) => {
    // console.log(receiverId);
    // console.log(data);
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage", data); //frontEnd -> we need to add an useEffect to listen to this
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen("4000");
