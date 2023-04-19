import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorGlobal, successGlobal } from "../reducers/notificationsSlice";
interface ISearchUsersByString {
  searchString: string;
}
export const searchUsersByString = createAsyncThunk(
  "user/registerUser",
  async ( searchString: ISearchUsersByString, { dispatch }) => {
    try {
      const request = await axios.post(`/api/searched-users`, {searchString});
      dispatch(successGlobal("Users found"));
      return { data: request.data };
    } catch (error: any) {

      dispatch(errorGlobal("Error while searching users"));
      throw error;
    }
  }
);