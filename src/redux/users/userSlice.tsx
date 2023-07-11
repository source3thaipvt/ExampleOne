import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../container/screens/home/HomeScreen";

const initialState: {
    users: TUser[]
} = {
    users: [],
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: { payload: TUser }) => {
            const newState = [...state.users, action.payload]
            state.users = newState;
        },
        removeUser: (state, action: { payload: number }) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
        resetUsers: (state, action: { payload: TUser[] }) => {
            state.users = action.payload
        },
    },
});

export const { addUser, removeUser, resetUsers } = userSlice.actions;

export default userSlice.reducer;