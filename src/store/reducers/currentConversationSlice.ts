import { createSlice } from "@reduxjs/toolkit";
import { Conversation } from "./userConversationsSlice";

export interface CurrentConversation {
    
}

const currentConversationSlice = createSlice({
    name: 'currentConversation',
    initialState: {conversation:{} as Conversation},
    reducers: {
        setAsCurrentConversation(state, action) {
            console.log(action.payload);
            state.conversation = action.payload;
        }
    },

});

export const {setAsCurrentConversation} = currentConversationSlice.actions;
export default currentConversationSlice.reducer;