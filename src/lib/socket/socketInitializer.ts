import { addSocketToCurrentConv, deleteSocketFromCurrentConv } from "@/store/actions/currentConversationThunk";
import { addNewSocketUser, addSocketUsers, deleteSocketUser } from "@/store/reducers/otherUsersSlice";
import { AppDispatch } from "@/store/store";
import { io } from "socket.io-client";

type SocketUser = {
    userSocketID: string;
    userID: string;
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
        console.log('on users');
        dispatch(addSocketUsers(otherUsers));
    });
    
    socket.on('user connected', (user:SocketUser)=>{
        dispatch(addNewSocketUser(user));
        dispatch(addSocketToCurrentConv(user));
    })

    socket.on('user disconnected', (user:SocketUser)=>{
        dispatch(deleteSocketUser(user));
        dispatch(deleteSocketFromCurrentConv(user));
    })

    socket.onAny((event:any) => {
        console.log(event);
      });
  };