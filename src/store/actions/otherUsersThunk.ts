import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorGlobal, successGlobal } from "../reducers/notificationsSlice";
import { RootState } from "../store";
// interface ISearchUsersByString {
//   searchString: string;
// }
// export const searchUsersByString = createAsyncThunk(
//   "otherUsers/searchUsersByString",
//   async ( searchString: ISearchUsersByString, { dispatch, getState }) => {
//     try {
//       const request = await axios.post(`/api/searched-users`, {searchString});

//       const state = getState() as RootState; // filter user itself
//       const userId = state.user.data._id;
//       return { data: request.data.filter((otherUser:any)=>otherUser._id !== userId) };
//     } catch (error: any) {

//       dispatch(errorGlobal("Error while searching users"));
//       throw error;
//     }
//   }
// );

export const searchAllUsers = createAsyncThunk(
  "otherUsers/searchAllUsers",
  async ( _, { dispatch, getState }) => {
    try {
      const request = await axios.get(`/api/searched-users`);
      const state = getState() as RootState; // filter user itself
      const userId = state.user.data._id;
      return { data: request.data.filter((otherUser:any)=>otherUser._id !== userId) };
    } catch (error: any) {

      dispatch(errorGlobal("Error while searching users"));
      throw error;
    }
  }
);