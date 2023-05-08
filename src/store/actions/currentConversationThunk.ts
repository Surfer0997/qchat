import { Message } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { errorGlobal } from '../reducers/notificationsSlice';
import { storeCreatedConversationLocally, storeSentMessageOnClient } from '../reducers/userConversationsSlice';
import { sendMessageOnClient } from '../reducers/currentConversationSlice';

interface ISendMessageOnServer {
  message: Message;
}

export const sendMessageOnServer = createAsyncThunk(
  'currentConversation/sendMessageOnServer',
  async ( message : Message, { dispatch, getState }) => {

    try {
      const state = getState() as RootState;
      const targetConversationId = state.currentConversation.conversation._id;
      // GET HIGEST ORDER => CREATE WITH HIGHER ORDER
      const maxOrder = Math.max(...state.userConversations.conversations.map((conv)=>conv.order));
      const order = state.currentConversation.conversation.order === maxOrder ? maxOrder : maxOrder + 1;
      const request = await axios.patch(`/api/conversation`, { targetConversationId, message, order });
    
      // SOCKET
      const socketID = state.currentConversation.conversation.socketID;
      // Update locally
      dispatch(sendMessageOnClient({...message, date: message.date.toString()}));
      dispatch(storeSentMessageOnClient({targetConversationId, message: {...message, date: message.date.toString()}}));
      return { data: {...request.data, socketID} };
    } catch (error) {
      dispatch(errorGlobal('Error while sending a message'));
      throw error;
    }
  }
);

interface ICreateConversationAnSendMessageOnServer {
  message: Message;
  myId: string;
  destId: string;
}

export const createConversationAnSendMessageOnServer = createAsyncThunk(
  'currentConversation/createConversationAnSendMessageOnServer',
  async ( {message, myId, destId, socketID} : any, { dispatch, getState }) => {
  
    try {
      const state = getState() as RootState;
      // GET HIGEST ORDER => CREATE WITH HIGHER ORDER
      const maxOrder = Math.max(...state.userConversations.conversations.map((conv)=>conv.order));
      const request = await axios.post(`/api/newConversation`, {messages: [message], myId, destId, order:maxOrder + 1 });
      
      // Update locally
      dispatch(storeCreatedConversationLocally({...request.data, name: request.data.members.filter((member: any) => member._id !== state.user.data._id)[0].nickname}));

      return { data: {...request.data, name: request.data.members.filter((member: any) => member._id !== state.user.data._id)[0].nickname, socketID} };
    } catch (error) {
      dispatch(errorGlobal('Error while sending a message'));
      throw error;
    }
  }
);
