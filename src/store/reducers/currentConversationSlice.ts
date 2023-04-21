import { createSlice } from "@reduxjs/toolkit";
import { Conversation } from "./userConversationsSlice";
import { sendMessageOnServer } from "../actions/currentConversationThunk";

const currentConversationSlice = createSlice({
    name: 'currentConversation',
    initialState: {conversation: {} as Conversation},
    reducers: {
        setAsCurrentConversation(state, action) {
            state.conversation = action.payload;
        },
        sendMessageOnClient(state, action) {
            state.conversation.messages.push(action.payload)
        }
    },
    extraReducers(builder) {
        builder.addCase(sendMessageOnServer.fulfilled, (state, action)=>{
            console.log('EXTRA REDUCER FULLFILLED', action);
        }) 
    },
});

export const {setAsCurrentConversation, sendMessageOnClient} = currentConversationSlice.actions;
export default currentConversationSlice.reducer;