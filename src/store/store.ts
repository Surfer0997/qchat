import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice';
import notificationsReducer from "./reducers/notificationsSlice";
import otherUsersReducer from "./reducers/otherUsersSlice";
import userConversationsReducer from "./reducers/userConversationsSlice";
import currentConversationReducer from "./reducers/currentConversationSlice";
import layoutReducer from "./reducers/layoutSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        notifications: notificationsReducer,
        otherUsers: otherUsersReducer,
        userConversations: userConversationsReducer,
        currentConversation: currentConversationReducer,
        layout: layoutReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
