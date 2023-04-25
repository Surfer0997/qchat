import { Message } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { errorGlobal } from '../reducers/notificationsSlice';
import { storeCreatedConversationLocally, storeSentMessageOnClient } from '../reducers/userConversationsSlice';

interface ISendMessageOnServer {
  message: Message;
}

export const sendMessageOnServer = createAsyncThunk(
  'currentConversation/sendMessageOnServer',
  async ( message : Message, { dispatch, getState }) => {

    try {
      const state = getState() as RootState;
      const targetConversationId = state.currentConversation.conversation._id;
      console.log(targetConversationId);
      // GET HIGEST ORDER => CREATE WITH HIGHER ORDER
      const maxOrder = Math.max(...state.userConversations.conversations.map((conv)=>conv.order));
      const order = state.currentConversation.conversation.order === maxOrder ? maxOrder : maxOrder + 1;
      console.log(state.currentConversation.conversation.order, maxOrder);
      console.log(order);
      const request = await axios.patch(`/api/conversation`, { targetConversationId, message, order });
    
      // Update locally
      dispatch(storeCreatedConversationLocally(request.data));
      // dispatch(storeSentMessageOnClient({targetConversationId, message: {...message, date: message.date.toString()}}));
      return { data: request.data };
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
  async ( {message, myId, destId} : any, { dispatch, getState }) => {
  
    try {
      const state = getState() as RootState;
      // GET HIGEST ORDER => CREATE WITH HIGHER ORDER
      const maxOrder = Math.max(...state.userConversations.conversations.map((conv)=>conv.order));
      const request = await axios.post(`/api/newConversation`, {messages: [message], myId, destId, order:maxOrder + 1 });
      
      // Update locally
      dispatch(storeCreatedConversationLocally(request.data));

      return { data: request.data };
    } catch (error) {
      dispatch(errorGlobal('Error while sending a message'));
      throw error;
    }
  }
);
