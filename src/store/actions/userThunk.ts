import cookie from 'react-cookies';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorGlobal, successGlobal } from "../reducers/notificationsSlice";
interface RegisterUserProps {
  nickname: string;
  password: string;
}
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ nickname, password }: RegisterUserProps, { dispatch }) => {
    try {
      const request = await axios.post(`/api/auth/register`, { nickname, password });
      dispatch(successGlobal("Account successfully created"));
      return { data: request.data, auth: true };
    } catch (error: any) {

      dispatch(errorGlobal("Error while registering new account"));
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ nickname, password }: RegisterUserProps, { dispatch }) => {
    try {
      const request = await axios.post(`/api/auth/login`, { nickname, password });
      dispatch(successGlobal("Logged in successfully!"));
      return { data: request.data, auth: true };
    } catch (error: any) {
      dispatch(errorGlobal("Error while logging in new account"));
      throw error;
    }
  }
);
///////////////// REMOVE
export const getTokenFromCookie = () => cookie.load('x-access-token');
export const removeTokenFromCookie = () => cookie.remove('x-access-token', {path:'/'});
export const getAuthHeader = () => {
  return { headers: {'Authorization':`Bearer ${getTokenFromCookie()}`}}
}
//////////////// REMOVE

export const isAuth = createAsyncThunk('users/isAuth', async (_, {dispatch}) => {
  try {
    const request = await axios.get('/api/auth/login', getAuthHeader());
    dispatch(successGlobal('Logged in successfully!'));
    return { data: request.data, auth: true }; // user
  } catch (error) {
    return { data: {}, auth: false }; // user
  }
});