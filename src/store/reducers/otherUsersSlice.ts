import { createSlice } from "@reduxjs/toolkit";
import { searchUsersByString } from "../actions/otherUsersThunk";
interface IOtherUsersSlice {
  users: {_id: string; nickname: string}[] | [];
  loading: boolean;
}
const initialState: IOtherUsersSlice = {
  users: [],
  loading: false
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
        state.users = action.payload.data;
      })
      .addCase(searchUsersByString.rejected, (state) => {
        state.loading = false;
      })
  }
});

export default otherUsersSlice.reducer;
