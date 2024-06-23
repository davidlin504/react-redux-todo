import data from '../../data.json';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from '../api/testAPI'

export const loginThunk = createAsyncThunk(
  'login',
  async (loginPayload, {fulfillWithValue, rejectWithValue}) => {
    try {
      const response = await login(loginPayload)
      return fulfillWithValue(response.data)

    } catch (err) {
      const payload = err
      const status = payload?.response?.status
      return rejectWithValue(status)
    }
  },
)


export const todoSlice = createSlice({
    name: 'User',
    //dummy data
    initialState: {
      data,
      user: {}
    },
    reducers: {},
    extraReducers(builder) {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload
      })
    }
})

