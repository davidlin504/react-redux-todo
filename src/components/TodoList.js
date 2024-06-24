import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';

import TodoRow from './TodoRow';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleComplete,
  deleteTodo,
  completeAll,
  removeComplete,
} from '../reducers/todoSlice'
import { createSelector } from 'reselect'

const TodoList = ({todos}) => {

  const [currentFilter, setCurrentFilter] = useState('')
  const dispatch = useDispatch();

  const handleCompleteTodo = (todo) => {
    dispatch(toggleComplete(todo));
  };

  const handleRemoveTodo = (id) => {
    dispatch(deleteTodo({id}));
  };

  const handleFilter = filter => {
    setCurrentFilter(filter)
  };

  const handleRemoveCompleted = () => {
    dispatch(removeComplete());
  };

  const handleCompleteAll = () => {
    dispatch(completeAll());
  };

  const filteredTodos = todos.filter(({ completed }) => {
      switch (currentFilter) {
        case 'completed':
          return completed;
        case 'active':
          return !completed;
        default:
          return true;
      }
    });


  return (
      <div className='main-section'>
        <div>
          <div className='todo-container'>
            {filteredTodos.map((todo, index) =>
              <TodoRow
                key={index}
                todo={todo}
                handleRemoveTodo={handleRemoveTodo}
                handleCompleteTodo={handleCompleteTodo}
              />
            )}
          </div>
          <Footer
            todos={filteredTodos}
            handleFilter={handleFilter}
            currentFilter={currentFilter}
            handleRemoveCompleted={handleRemoveCompleted}
            handleCompleteAll={handleCompleteAll}
          />
        </div>
      </div>
    );
}

export default TodoList
