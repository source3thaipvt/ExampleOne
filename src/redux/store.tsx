import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import postSlice from "./post/postSlice";
import userSlice from "./users/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    users: userSlice
  },
  
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;