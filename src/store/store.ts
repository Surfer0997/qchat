import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice';
import notificationsReducer from "./reducers/notificationsSlice";
import otherUsersReducer from "./reducers/otherUsersSlice";
import userConversationReducer from "./reducers/userConversationsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        notifications: notificationsReducer,
        otherUsers: otherUsersReducer,
        userConversations: userConversationReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
