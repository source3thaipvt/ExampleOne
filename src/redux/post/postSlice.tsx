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
    setSkip: (state, action: { payload: number }) => {
      state.skip = action.payload
    },
    resetStatePost: () => initialState
  },
});

export const { removePost, addPosts, setSkip, resetStatePost } = postSlice.actions;

export default postSlice.reducer;