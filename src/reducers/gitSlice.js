import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { playJobThunk, cancelJobThunk, listJobsThunk } from '../thunks/gitThunk.js'
import mockData from '../project.js'


export const gitSlice = createSlice({
    name: 'git',
    initialState: {
      jobs: mockData
    },
    reducers: {
    },
    extraReducers(builder) {
      builder.addCase(playJobThunk.fulfilled, (state, action) => {
        return {
          jobs: state.jobs.map(job =>
          job.id === action.meta.arg ?
            {
              ...job,
              ci_status: false,
            } :
            job
          )
        }
    })
    builder.addCase(cancelJobThunk.fulfilled, (state, action) => {
        return {
          jobs: state.jobs.map(job =>
          job.id === action.meta.arg ?
            {
              ...job,
              ci_status: true,
            } :
            job
          )
        }
    })
    builder.addCase(listJobsThunk.fulfilled, (state, action) => {
      state.jobs = action.payload.map(({ id, name, ref, status, stage }) => ({ id, name, ref, status, stage }))
      return state
    })
  },
});


export const { } = gitSlice.actions;

export default gitSlice.reducer;
