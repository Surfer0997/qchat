import { createSlice } from '@reduxjs/toolkit';
import { searchAllUsers } from '../actions/otherUsersThunk';
import { SocketUser } from '@/types/types';

interface IOtherUsersSlice {
  users: { _id: string; nickname: string; socketID?: string }[];
  loading: boolean;
  allUsersAreDisplayed: boolean;
}
const initialState: IOtherUsersSlice = {
  users: [],
  loading: false,
  allUsersAreDisplayed: false,
};

export const otherUsersSlice = createSlice({
  name: 'otherUsers',
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
      state.users = state.users.map(user => {
        const indexOfExistingSocket = action.payload.findIndex(
          (socketUser: SocketUser) => socketUser.userID === user._id
        );

        if (indexOfExistingSocket >= 0) {
          return { ...user, socketID: action.payload[indexOfExistingSocket].userSocketID };
        }
        return user;
      });
    },
    addNewSocketUser(state, action) {
      // action.payload = user as SocketUser
      let hasToAddNewRegisteredUser = true;
      state.users = state.users.map(user => {
        if (user._id === action.payload.userID) {
          hasToAddNewRegisteredUser = false;
        }
        return user._id === action.payload.userID ? { ...user, socketID: action.payload.userSocketID } : user;
      });
      if (hasToAddNewRegisteredUser) {
        state.users.push({
          _id: action.payload.userID,
          nickname: action.payload.userNickname,
          socketID: action.payload.userSocketID,
        });
      }
    },
    deleteSocketUser(state, action) {
      // action.payload = user as SocketUser
      state.users = state.users.map(user => {
        return user._id === action.payload.userID ? { ...user, socketID: undefined } : user;
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(searchAllUsers.rejected, state => {
        state.loading = false;
      });
  },
});
export const { addSocketUsers, addNewSocketUser, deleteSocketUser, notDisplayAllUsers, displayAllUsers } =
  otherUsersSlice.actions;
export default otherUsersSlice.reducer;
