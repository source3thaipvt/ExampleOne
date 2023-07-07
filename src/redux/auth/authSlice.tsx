import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "../../api/api";

const initialState: {
  token: string | null,
  user: any,
  loading: boolean
} = {
  token: null,
  user: null,
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      // Add user to the state array
      state.user = action.payload
    })
  }
});

export const { setToken, setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;