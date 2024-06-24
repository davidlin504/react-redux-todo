import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { testAPI } from '../api/testAPI'


export const fetchTestsThunk = createAsyncThunk(
  'todos/fetchTests',
  async (_ignored, { getState, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await testAPI()
      return fulfillWithValue(response.data)
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
        text: 'This is a todo',
        completed: false,
      },
      {
        id: 1,
        text: 'tasks1',
        completed: false,
      },
      {
        id: 2,
        text: 'tasks2',
        completed: false,
      },
      {
        id: 3,
        text: 'tasks3',
        completed: false,
      },
      {
        id: 4,
        text: 'tasks4',
        completed: false,
      },
    ],
    //responds to the action, takes the current state, handles the action similar to database tables
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: state.length,
                text: action.payload.text,
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
              completed: !alreadyCompleted
            }));
        },
        removeComplete: (state) => {
          return state.filter(todo => todo.completed === false);
        },
        completeFilter: (state, action) => {
          const alreadyCompleted = action.payload.todos.every(({ completed }) => completed);
          const filter_todos = action.payload.todos.map(todo => ({
            ...todo,
            completed: !alreadyCompleted
          }));
          const updated_ids = filter_todos.map(o => o.id)
          // const not_updated = state.filter(todo => !updated_ids.includes(todo.id))
          // return [...not_updated, ...filter_todos]
          const todos = state
          updated_ids.forEach(u => {
              let todo = todos.find(todo => todo.id === u.id);
              if (todo) {
                  todo.done = true;
              }
          });
          return todos
        }
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


export const { addTodo, toggleComplete, deleteTodo, completeAll, removeComplete, completeFilter } = todoSlice.actions;

export default todoSlice.reducer;
