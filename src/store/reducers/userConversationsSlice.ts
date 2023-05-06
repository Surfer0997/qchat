import { createSlice } from '@reduxjs/toolkit';
import { searchConversationsByUserId } from '../actions/userConversationsThunk';
import { Conversation, Message } from '@/types/types';

interface UserConversations {
    loading: boolean;
    conversations: Conversation[];
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
      const conversation = action.payload as Conversation;
      state.conversations = state.conversations.filter((conv)=>conv._id !== conversation._id);
      state.conversations.push(action.payload);
    },
    //////////////SOCKET
    storeMessageFromSocket(state, action) {
      const message = action.payload.message as Message;
      state.conversations.forEach((conv)=>{
        if (conv._id === action.payload.targetConversationId) conv.messages.push(message)
      });
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
export const {storeSentMessageOnClient, storeCreatedConversationLocally, storeMessageFromSocket } = userConversationsSlice.actions;
export default userConversationsSlice.reducer;