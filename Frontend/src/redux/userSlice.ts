import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export type UserState = {
  userId: string;
  isLogin: boolean;
};

const initialState: UserState = {
  userId: "",
  isLogin: false,
};

type LoginActionModel = {
  payload: {
    userId: string;
  };
  type: string;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: LoginActionModel) => {
      state.userId = action.payload.userId;
      state.isLogin = true;
    },
    logout: (state) => {
      state.userId = "";
      state.isLogin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
