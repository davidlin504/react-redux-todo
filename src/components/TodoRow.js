import React, { useEffect, useCallback } from 'react';
import ListItem from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import './todo.scss'


const TodoRow = (props) => {

  const { todo, handleRemoveTodo, handleCompleteTodo } = props;
  const dispatch = useDispatch();



  return (
    <div className='todo-content'>
      <ListItem
      >
        <Checkbox
          style={todo.completed ? styles.completed : {}}
          onChange={() => handleCompleteTodo(todo)}
          checked={todo.completed}
        />
        <ListItemText primary={todo.text} />
        <div onClick={() => handleRemoveTodo(todo.id)}>
          <Icon
            className="material-icons"
            color="red"
          >
            clear
          </Icon>
        </div>
      </ListItem>
    </div>
  );
}


const styles = {
  completed: {
    color: 'gray',
    textDecoration: 'line-through',
  },
};

export default TodoRow;