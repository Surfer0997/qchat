import { createSlice } from "@reduxjs/toolkit";
import { isAuth, loginUser, registerUser } from "../actions/userThunk";
import { mongoUser } from "@/types/types";
import { removeTokenFromCookie } from "../actions/userThunk";

const DEFAULT_USER_STATE = {
  loading: false,
  data: {
    _id: null,
    nickname: null,
  },
  auth: null,
};

export interface User {
  loading: boolean;
  data: {
    _id: string | null;
    nickname: string | null;
  };
  auth: null | boolean;
}

const userSlice = createSlice({
  name: "user",
  initialState: DEFAULT_USER_STATE as User,
  reducers: {
    logOut(state) {
      state = DEFAULT_USER_STATE;
      removeTokenFromCookie();
    }
  },
  extraReducers: (builder) => {
    // REGISTRATION
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.auth = action.payload.auth;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      // SIGN IN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.auth = action.payload.auth;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      // IS AUTHENTICATED
      .addCase(isAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(isAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload.data };
        state.auth = action.payload.auth;
      })
      .addCase(isAuth.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const {logOut} = userSlice.actions;
export default userSlice.reducer;
