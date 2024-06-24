import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const mockData = [
      {
        id: 0,
        name: '#16545',
        status: 'manual',
        ci_status: false
      },
      {
        id: 1,
        name: '#16547',
        status: 'manual',
        ci_status: false
      },
      {
        id: 2,
        name: '#16548',
        status: 'success',
        ci_status: false
      },
      {
        id: 3,
        name: '#16549',
        status: 'warining',
        ci_status: false
      }
    ]

export const gitSlice = createSlice({
    name: 'git',
    //dummy data
    initialState: {
      jobs: mockData
    },
    //responds to the action, takes the current state, handles the action similar to database tables
    reducers: {
        playJob: (state, action) => {
            return {
              jobs: state.jobs.map(job =>
              job.id === action.payload.id ?
                {
                  ...job,
                  ci_status: !job.ci_status,
                } :
                job
              )
            }


        },
    },
});


export const { playJob } = gitSlice.actions;

export default gitSlice.reducer;
