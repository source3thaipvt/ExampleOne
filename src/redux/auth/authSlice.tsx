import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "../../api/api";

const initialState: {
  token: any,
  userInfo: any,
  loading: boolean
} = {
  token: null,
  userInfo: null,
  loading: false
};

// First, create the thunk
const fetchLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string, password: string }, thunkApi) => {
    const response = await api.postLogin(username, password)
    if (response.status !== 200) {
      return thunkApi.rejectWithValue((await response.json()))
    }
    return response.data
  }
)


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetStateAuth: () => initialState
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      // Add user to the state array
      state.userInfo = action.payload
    })
  }
});

export const { setToken, setUserInfo, setLoading, resetStateAuth } = authSlice.actions;

export default authSlice.reducer;