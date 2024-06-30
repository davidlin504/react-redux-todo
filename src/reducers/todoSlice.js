import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTests, postTests } from '../api/testAPI'


export const fetchTestsThunk = createAsyncThunk(
  'todos/fetchTests',
  async (_ignored, { getState, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await getTests()
      return fulfillWithValue(response.data)
    } catch (err) {
      console.error(err)
      return rejectWithValue([])
    }
  },
)

export const postTestsThunk = createAsyncThunk(
  'todos/postTests',
  async (payload, { getState, fulfillWithValue, rejectWithValue }) => {
    try {
      await postTests(payload)
      // const response = await postTests(payload)
      // return fulfillWithValue(response.data)
    } catch (err) {
      console.error(err)
      return rejectWithValue([])
    }
  },
)

export const todoSlice = createSlice({
    name: 'todos',
    //dummy data
    initialState: [
      {
        id: 0,
        tag: 'This is a todo',
        flag: '-e',
        completed: false,
      },
      {
        id: 1,
        tag: 'tasks1',
        flag: '-e',
        completed: false,
      },
      {
        id: 2,
        tag: 'tasks2',
        flag: '-e',
        completed: false,
      },
      {
        id: 3,
        tag: 'tasks3',
        flag: '-e',
        completed: false,
      },
      {
        id: 4,
        tag: 'tasks4',
        flag: '-e',
        completed: false,
      },
    ],
    //responds to the action, takes the current state, handles the action similar to database tables
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: state.length,
                tag: action.payload.tag,
                completed: false,
            };
            state.push(todo);
        },
        toggleComplete: (state, action) => {
            // const index = state.findIndex((todo) => todo.id === action.payload.id);
            // state[index].completed = !action.payload.completed;
            return state.map(todo =>
            todo.id === action.payload.id ?
              {
                ...todo,
                completed: !action.payload.completed,
                flag: !action.payload.completed ? '-i' : '-e',
              } :
              todo
          );
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        },
        completeAll: (state) => {
            const alreadyCompleted = state.every(({ completed }) => completed);
            return state.map(todo => ({
              ...todo,
              completed: !alreadyCompleted,
              flag: !alreadyCompleted ? '-i' : '-e'
            }));
        },
        removeComplete: (state) => {
          return state.filter(todo => todo.completed === false);
        },
        unSelect: (state, action) => {
          return state.map(todo =>
            todo.id === action.payload.id ? {
              ...todo,
              completed: false,
              flag: '-e'
            } :
            todo
          );
        }
        // need refactor
        // completeFilter: (state, action) => {
        //   const alreadyCompleted = action.payload.todos.every(({ completed }) => completed);
        //   const filter_todos = action.payload.todos.map(todo => ({
        //     ...todo,
        //     completed: !alreadyCompleted,
        //   }));
        //   const updated_ids = filter_todos.map(o => o.id)
        //   // const not_updated = state.filter(todo => !updated_ids.includes(todo.id))
        //   // return [...not_updated, ...filter_todos]
        //   const todos = state
        //   updated_ids.forEach(u => {
        //       let todo = todos.find(todo => todo.id === u.id);
        //       if (todo) {
        //           todo.done = true;
        //       }
        //   });
        //   return todos
        // }
    },
    extraReducers(builder) {
      // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchTestsThunk.fulfilled, (state, action) => {
          return action.payload
        })
        builder.addCase(fetchTestsThunk.rejected, (state, action) => {
          return state
          // state.push(action.payload)
        })
  },
});


export const {
  addTodo,
  toggleComplete,
  deleteTodo,
  completeAll,
  removeComplete,
  unSelect } = todoSlice.actions;

export default todoSlice.reducer;
