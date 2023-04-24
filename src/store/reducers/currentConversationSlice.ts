import { createSlice } from "@reduxjs/toolkit";
import { Conversation } from "./userConversationsSlice";
import { createConversationAnSendMessageOnServer, sendMessageOnServer } from "../actions/currentConversationThunk";
import { Message } from "@/types/types";

const currentConversationSlice = createSlice({
    name: 'currentConversation',
    initialState: {conversation: {} as Conversation},
    reducers: {
        setAsCurrentConversation(state, action) {
            state.conversation = {...action.payload};
        },
        sendMessageOnClient(state, action) {
            state.conversation.messages.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder.addCase(sendMessageOnServer.fulfilled, (state, action)=>{
            state.conversation.messages.push(action.payload.data as Message); // Add on client after successfully adding on server
        })
        .addCase(createConversationAnSendMessageOnServer.fulfilled, (state, action)=>{
            state.conversation = action.payload.data;
        }) 
    },
});

export const {setAsCurrentConversation, sendMessageOnClient} = currentConversationSlice.actions;
export default currentConversationSlice.reducer;