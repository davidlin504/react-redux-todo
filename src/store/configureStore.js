import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../reducers/todoSlice';
import gitReducer from '../reducers/gitSlice';

export default configureStore({
  reducer: {
    todos: todoReducer,
    git: gitReducer,
  },
})
