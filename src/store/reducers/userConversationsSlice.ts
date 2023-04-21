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
}

const userConversationsSlice = createSlice({
  name: 'userConversations',
  initialState: {loading: false, conversations: [] as Conversation[]} as UserConversations,
  reducers: {},
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

export default userConversationsSlice.reducer;