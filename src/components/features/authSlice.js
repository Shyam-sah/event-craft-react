import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  role: '',
  token:'',
  user:{}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload;

    },
    setAccessToken: (state, action) => {
      state.token = action.payload;

    },

    setUserObject: (state, action) => {
      state.user = action.payload;

    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = '';

    },
  },
});

export const { loginUser, logout, setAccessToken,setUserObject } = authSlice.actions;
export default authSlice.reducer;
