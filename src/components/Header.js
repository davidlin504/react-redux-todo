import React from 'react';
import { useDispatch } from 'react-redux';
import TodoTextField from './TodoTextField';
import { addTodo } from '../reducers/todoSlice'

const Header = () => {
  const dispatch = useDispatch();

  const handleAddTodo = (text) => {
      dispatch(addTodo({ text }));
  };

  return (
    <div>
      <TodoTextField onSubmit={text => handleAddTodo(text)} />
    </div>
  );

}

export default Header
