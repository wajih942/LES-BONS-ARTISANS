import { createSlice } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('user') ?? '{"token":null,"userId":null}');

const initialState = {
  isAuth: storedUser.token !== null,
  token: storedUser.token,
  userId: storedUser.userId, // Add userId to initial state
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    saveCredentials: (state, action) => {
      const { signInResponse } = action.payload; // signInResponse should include token and userId
      console.log(signInResponse);
      localStorage.setItem('user', JSON.stringify(signInResponse));
      state.token = signInResponse.token;
      state.userId = signInResponse.userId; // Save userId in state
      state.isAuth = true;
    },
    removeCredentials: (state) => {
      state.token = null;
      state.userId = null; // Clear userId
      state.isAuth = false;
      localStorage.removeItem('user');
    }
  }
});

export const { saveCredentials, removeCredentials } = authSlice.actions;

export default authSlice;
