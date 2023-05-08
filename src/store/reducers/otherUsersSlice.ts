import { createSlice } from "@reduxjs/toolkit";
import { searchAllUsers, searchUsersByString } from "../actions/otherUsersThunk";
import { SocketUser } from "@/types/types";
interface IOtherUsersSlice {
  users: {_id: string; nickname: string, socketID?: string}[];
  loading: boolean;
  allUsersAreDisplayed: boolean;
  socketUsers:{
    userSocketID: string,
      userID: string,
  }[]; // FIX
}
const initialState: IOtherUsersSlice = {
  users: [],
  loading: false,
  allUsersAreDisplayed: false,
  socketUsers: []
};

export const otherUsersSlice = createSlice({
  name: "otherUsers",
  initialState,
  reducers: {
    displayAllUsers(state) {
      state.allUsersAreDisplayed = true;
    },
    notDisplayAllUsers(state) {
      state.allUsersAreDisplayed = false;
    },
    addSocketUsers(state, action) {
       // action.payload = users as SocketUser[]
       state.users = state.users.map((user)=>{
        const indexOfExistingSocket = action.payload.findIndex((socketUser:SocketUser)=>socketUser.userID === user._id);
        if (indexOfExistingSocket >= 0) {
          return {...user, socketID: action.payload[indexOfExistingSocket].userSocketID}
        } 
        return user;
       })
    },
    addNewSocketUser(state, action) {
      // action.payload = user as SocketUser
      state.users = state.users.map((user)=>{
       return user._id === action.payload.userID ? {...user, socketID: action.payload.userSocketID} : user;
      });
    },
    deleteSocketUser(state, action) {
      // action.payload = user as SocketUser
      state.users = state.users.map((user)=>{
        return user._id === action.payload.userID ? {...user, socketID: undefined} : user;
       });
    }
  },
  extraReducers: (builder)=>{
    builder
    // .addCase(searchUsersByString.pending, (state)=>{
    //     state.loading = true;
    // })
    // .addCase(searchUsersByString.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.allUsersAreDisplayed = false;
    //     state.users = action.payload.data;
    //   })
    //   .addCase(searchUsersByString.rejected, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(searchAllUsers.pending, (state)=>{
    //     state.loading = true;
    // })
    .addCase(searchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(searchAllUsers.rejected, (state) => {
        state.loading = false;
      })
  }
});
export const { addSocketUsers, addNewSocketUser, deleteSocketUser,notDisplayAllUsers, displayAllUsers} = otherUsersSlice.actions;
export default otherUsersSlice.reducer;
