import { createSlice } from "@reduxjs/toolkit";
import { addSocketToCurrentConv, createConversationAnSendMessageOnServer, deleteSocketFromCurrentConv, sendMessageOnServer } from "../actions/currentConversationThunk";
import { Conversation } from "@/types/types";

const currentConversationSlice = createSlice({
    name: 'currentConversation',
    initialState: {conversation: {} as Conversation}, // + socketID field, if socketId exists at end user
    reducers: {
        setAsCurrentConversation(state, action) {
            state.conversation = {...action.payload};
        },
        sendMessageOnClient(state, action) {
            state.conversation.messages.push(action.payload);
        },
        clearCurrentConversation(state) {
            state.conversation = {} as Conversation;
        }

    },
    extraReducers(builder) {
        builder.addCase(sendMessageOnServer.fulfilled, (state, action)=>{
           state.conversation = {...action.payload.data, name: state.conversation.name} as Conversation; // Add on client after successfully adding on server
        })
        .addCase(createConversationAnSendMessageOnServer.fulfilled, (state, action)=>{
            state.conversation = {...action.payload.data};
        })
        .addCase(addSocketToCurrentConv.fulfilled, (state, action)=>{
            state.conversation.socketID = action.payload;
        })
        .addCase(deleteSocketFromCurrentConv.fulfilled, (state, action)=>{
            state.conversation.socketID = action.payload;
        })
    },
});

export const {setAsCurrentConversation, sendMessageOnClient, clearCurrentConversation} = currentConversationSlice.actions;
export default currentConversationSlice.reducer;