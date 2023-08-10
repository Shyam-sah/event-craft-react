import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice';
import eventDetail from "../features/eventDetailSlice";
import userDetail from "../features/userDetailSlice";

export const store = configureStore({
  reducer: {
    event: eventDetail,
    auth: authReducer,
    user: userDetail,
  },
});
