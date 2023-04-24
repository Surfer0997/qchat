import { Message } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { errorGlobal, successGlobal } from '../reducers/notificationsSlice';
import { moveConversationToTop, storeCreatedConversationLocally, storeSentMessageOnClient } from '../reducers/userConversationsSlice';

interface ISendMessageOnServer {
  message: Message;
}

export const sendMessageOnServer = createAsyncThunk(
  'currentConversation/sendMessageOnServer',
  async ( message : Message, { dispatch, getState }) => {

    try {
      const state = getState() as RootState;
      const targetConversationId = state.currentConversation.conversation._id;
      const request = await axios.patch(`/api/conversation`, { targetConversationId, message });

      // Update locally
      dispatch(moveConversationToTop(state.currentConversation.conversation));
      dispatch(storeSentMessageOnClient({targetConversationId, message: {...message, date: message.date.toString()}}));
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
    console.log(message, myId, destId);
    try {
      const state = getState() as RootState;

      const request = await axios.post(`/api/newConversation`, {messages: [message], myId, destId});

      // Update locally
      dispatch(storeCreatedConversationLocally(request.data));

      return { data: request.data };
    } catch (error) {
      dispatch(errorGlobal('Error while sending a message'));
      throw error;
    }
  }
);
