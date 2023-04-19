import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice';
import notificationsReducer from "./reducers/notificationsSlice";
import otherUsersSlice from "./reducers/otherUsersSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        notifications: notificationsReducer,
        otherUsers: otherUsersSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
