import { Message } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { errorGlobal, successGlobal } from '../reducers/notificationsSlice';

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
      const request = await axios.patch(`/api/conversation`, { targetConversationId, message });
      dispatch(successGlobal('Message is sent'));
      return { data: request.data };
    } catch (error) {
      dispatch(errorGlobal('Error while sending a message'));
      throw error;
    }
  }
);
