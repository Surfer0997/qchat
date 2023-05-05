import { addNewSocketUser, addSocketUsers } from "@/store/reducers/otherUsersSlice";
import { AppDispatch } from "@/store/store";
import { io } from "socket.io-client";

type SocketUser = {
    userSocketID: String;
    userID: String;
}

export let socket = io('', {autoConnect:false});
/////////////////// FIX TYPES
export const socketInitializer = async (dispatch:AppDispatch) => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket/socket");
    socket = io('', {autoConnect:false});

    socket.on("users", (users:SocketUser[]) => {
        const otherUsers = users.filter((user:SocketUser)=>{
            return user.userSocketID !== socket.id;
        });
        dispatch(addSocketUsers(otherUsers));
    });
    
    socket.on('user connected', (user:SocketUser)=>{
        dispatch(addNewSocketUser(user));
    })

    socket.onAny((event:any) => {
        console.log(event);
      });
  };