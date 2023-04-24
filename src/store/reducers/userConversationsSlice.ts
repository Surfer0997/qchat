import { createSlice } from '@reduxjs/toolkit';
import { searchConversationsByUserId } from '../actions/userConversationsThunk';
import { Message } from '@/types/types';

interface UserConversations {
    loading: boolean;
    conversations: Conversation[];
}

export interface Conversation {
  _id: string;
  name: string;
  messages: Message[];
  members: {
    _id: string;
    nickname: string;
  }[]
}

const userConversationsSlice = createSlice({
  name: 'userConversations',
  initialState: {loading: false, conversations: [] as Conversation[]} as UserConversations,
  reducers: {
    storeSentMessageOnClient(state, action) {
      state.conversations.forEach((conv)=>{
        if (conv._id === action.payload.targetConversationId) conv.messages.push(action.payload.message)
      });
    },
    storeCreatedConversationLocally(state, action) {
      state.conversations.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder.addCase(searchConversationsByUserId.pending, (state)=>{
        state.loading = true;
    })
    .addCase(searchConversationsByUserId.fulfilled, (state, action) => {

        state.loading = false;
        state.conversations = action.payload.data;

    })
    .addCase(searchConversationsByUserId.rejected, (state)=>{
        state.loading = false;
    })
  }
});
export const {storeSentMessageOnClient, storeCreatedConversationLocally} = userConversationsSlice.actions;
export default userConversationsSlice.reducer;