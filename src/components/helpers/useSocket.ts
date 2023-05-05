import { addNewSocketUser, addSocketUsers } from '@/store/reducers/otherUsersSlice';
import { storeMessageFromSocket } from '@/store/reducers/userConversationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Message } from '@/types/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

type SocketUser = {
  userSocketID: String;
  userID: String;
};

export let socket: any;
/////////////////// FIX TYPES
export const socketInitializer = async (dispatch: AppDispatch) => {
  // We just call it because we don't need anything else out of it
};

export const useSocket = () => {
  const dispatch = useDispatch();
//   const [socket, setSocket] = useState()
  useEffect(() => {
    async function initializeSocket() {
      try {
        await fetch('/api/socket/socket');

        socket = io('', { autoConnect: false });

        socket.on('users', (users: SocketUser[]) => {
          const otherUsers = users.filter((user: SocketUser) => {
            return user.userSocketID !== socket.id;
          });
          dispatch(addSocketUsers(otherUsers));
          // DISPATCH
        });

        socket.on('user connected', (user: SocketUser) => {
          dispatch(addNewSocketUser(user));
        });

        socket.onAny((event: any) => {
          console.log(event);
        });
      } catch (error) {}
    }
  });
};
