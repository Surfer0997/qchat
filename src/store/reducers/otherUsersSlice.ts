import { createSlice } from "@reduxjs/toolkit";
import { searchAllUsers, searchUsersByString } from "../actions/otherUsersThunk";
interface IOtherUsersSlice {
  users: {_id: string; nickname: string}[] | [];
  loading: boolean;
  allUsersAreDisplayed: boolean;
}
const initialState: IOtherUsersSlice = {
  users: [],
  loading: false,
  allUsersAreDisplayed: false
};

export const otherUsersSlice = createSlice({
  name: "otherUsers",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(searchUsersByString.pending, (state)=>{
        state.loading = true;
    })
    .addCase(searchUsersByString.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsersAreDisplayed = false;
        state.users = action.payload.data;
      })
      .addCase(searchUsersByString.rejected, (state) => {
        state.loading = false;
      })
      .addCase(searchAllUsers.pending, (state)=>{
        state.loading = true;
    })
    .addCase(searchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsersAreDisplayed = true;
        state.users = action.payload.data;
      })
      .addCase(searchAllUsers.rejected, (state) => {
        state.loading = false;
      })
  }
});

export default otherUsersSlice.reducer;
