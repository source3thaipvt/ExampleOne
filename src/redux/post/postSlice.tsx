import { createSlice } from "@reduxjs/toolkit";

const initialState:{
    tasks: any[]
} = {
  tasks: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push({ id: Date.now(), text: action.payload });
    },
    deleteTodo: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = postSlice.actions;

export default postSlice.reducer;