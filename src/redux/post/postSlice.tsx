import { createSlice } from "@reduxjs/toolkit";
import { TPost } from "../../container/screens/home/HomeScreen";

const initialState: {
  posts: TPost[],
  skip: number,
} = {
  posts: [],
  skip: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPosts: (state, action: { payload: TPost[] }) => {
      const newState = [...state.posts, ...action.payload]
      state.posts = newState;
    },
    removePost: (state, action: { payload: number }) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    resetPosts: (state, action: { payload: TPost[] }) => {
      state.posts = action.payload
    },
    setSkip: (state, action: { payload: number }) => {
      state.skip = action.payload
    }
  },
});

export const { removePost, addPosts, resetPosts, setSkip } = postSlice.actions;

export default postSlice.reducer;