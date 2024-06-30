import React, { useEffect, useState } from 'react';
import TodoRow from './TodoRow';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import {
  toggleComplete,
  deleteTodo,
  completeAll,
  removeComplete,
} from '../reducers/todoSlice'
import { postTestsThunk } from '../reducers/todoSlice'
import Button from '@material-ui/core/Button';


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

  const handlePostAction = (payload) => {
    dispatch(postTestsThunk(payload)).unwrap()
  }

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
          <Button variant="contained" onClick={() => handlePostAction(todos)}>Save tests</Button>
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
