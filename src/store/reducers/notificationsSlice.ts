import { createSlice } from "@reduxjs/toolkit";
interface GlobalNotification {
  global: {
    error: boolean | undefined;
    success: boolean | undefined;
    msg: string | undefined;
  };
}
const initialState: GlobalNotification = {
  global: { error: undefined, success: undefined, msg: undefined },
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    errorGlobal: (state, action) => {
      state.global.error = true;
      state.global.msg = action.payload;
    },
    successGlobal: (state, action) => {
      state.global.success = true;
      state.global.msg = action.payload;
    },
    clearNotifications: (state) => {
      state.global = { error: undefined, success: undefined, msg: undefined };
    },
  },
});

export const { errorGlobal, successGlobal, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
