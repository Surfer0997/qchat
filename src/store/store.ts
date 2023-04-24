import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice';
import notificationsReducer from "./reducers/notificationsSlice";
import otherUsersReducer from "./reducers/otherUsersSlice";
import userConversationReducer from "./reducers/userConversationsSlice";
import currentConversationReducer from "./reducers/currentConversationSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        notifications: notificationsReducer,
        otherUsers: otherUsersReducer,
        userConversations: userConversationReducer,
        currentConversation: currentConversationReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
