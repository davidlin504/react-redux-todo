import { createAsyncThunk } from '@reduxjs/toolkit';
import { playJob, cancelJob, listJobs } from '../api/gitAPI'


export const listJobsThunk = createAsyncThunk(
  'listJobs',
  async (_, {fulfillWithValue, rejectWithValue}) => {
    try {
      const response = await listJobs()
      return fulfillWithValue(response.data)

    } catch (err) {
      const payload = err
      const status = payload?.response?.status
      return rejectWithValue(status)
    }
  },
)

export const playJobThunk = createAsyncThunk(
  'playJob',
  async (payload, {fulfillWithValue, rejectWithValue}) => {
    try {
      const response = await playJob(payload)
      return fulfillWithValue(response.data)

    } catch (err) {
      const payload = err
      const status = payload?.response?.status
      return rejectWithValue(status)
    }
  },
)

export const cancelJobThunk = createAsyncThunk(
  'cancelJob',
  async (payload, {fulfillWithValue, rejectWithValue}) => {
    try {
      const response = await cancelJob(payload)
      return fulfillWithValue(response.data)

    } catch (err) {
      const payload = err
      const status = payload?.response?.status
      return rejectWithValue(status)
    }
  },
)

