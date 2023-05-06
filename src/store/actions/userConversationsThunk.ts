import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorGlobal, successGlobal } from '../reducers/notificationsSlice';

import { RootState } from '../store';
import { Conversation } from '@/types/types';
interface ISearchConversationsByUserId {
  userId: string;
}
export const searchConversationsByUserId = createAsyncThunk(
  'userConversations/searchConversationByUserId',
  async ({ userId }: ISearchConversationsByUserId, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const request = (await axios.post(`/api/conversation`, { userId })) as { data: Conversation[] };

      const readyData = request.data.map((d: any) => {
        if (d.name) {
          return d;
        }
        return {
          ...d,
          name: d.members.filter((member: any) => member._id !== state.user.data._id)[0].nickname,
        };
      });

      return { data: readyData };
    } catch (error: any) {
      dispatch(errorGlobal('Error while searching conversations'));
      throw error;
    }
  }
);

// interface ISearchConversationsByMembers {
//   members: string[];
// }
// export const searchConversationsByMembers = createAsyncThunk(
//   'userConversations/searchConversationByUserId',
//   async ({ members }: ISearchConversationsByMembers, { dispatch, getState }) => {
//     try {
//       const state = getState() as RootState;
//       const request = (await axios.post(`/api/conversationByMembers`, { members })) as { data: Conversation }; // CHANGE

//       const readyData = {
//         ...request.data,
//         name: request.data.members.filter((member: any) => member._id !== state.user.data._id)[0].nickname,
//       };

//       return { data: readyData };
//     } catch (error: any) {
//       dispatch(errorGlobal('Error while searching conversations'));
//       throw error;
//     }
//   }
// );
