import { Server } from "socket.io";


export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.use((socket, next) => {
    const userID = socket.handshake.auth.userID;
    if (!userID) {
      return next(new Error("invalid username"));
    }
    // @ts-ignore
    socket.userID = userID;
    next();
  });

  const onConnection = (socket) => {
    ////// GIVE ALL CONNECTED USERS
    const users = [];
    // @ts-ignore
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userSocketID: id,
        userID: socket.userID,
      });
    }
    socket.emit("users", users);

    ////// SEND NEW CONNECTED USER
    socket.broadcast.emit("user connected", {
      userSocketID: socket.id,
      userID: socket.userID,
    });


    /////// SEND PRIVATE MESSAGE
    socket.on("private message", ({ message, to, from }) => {
      socket.to(to).emit("newIncomingMessage", {author: from, message});
    });

    ////// HANDLE DISCONNECT
    socket.on("disconnect", (reason) => {
      socket.broadcast.emit("user disconnected", {
        userSocketID: socket.id,
        userID: socket.userID,
      });
    });
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}
