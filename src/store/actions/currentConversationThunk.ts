import { Message } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { errorGlobal, successGlobal } from '../reducers/notificationsSlice';
import { storeSentMessageOnClient } from '../reducers/userConversationsSlice';

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
      dispatch(storeSentMessageOnClient({targetConversationId, message: {...message, date: message.date.toString()}}));
      return { data: request.data };
    } catch (error) {
      dispatch(errorGlobal('Error while sending a message'));
      throw error;
    }
  }
);
