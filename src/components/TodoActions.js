import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import { toggleComplete, unSelect } from '../reducers/todoSlice'
import { useDispatch } from 'react-redux';



const TodoActions = (props) => {
  const dispatch = useDispatch();

  const handleFilterCheck = (todos) => {
    todos.map(todo => {
      dispatch(toggleComplete(todo))
    })
  }

  const handleUnselect = (todos) => {
    todos.map(todo => {
      dispatch(unSelect(todo))
    })
  }


  const {
    todos,
    currentFilter,
    handleFilter,
    handleRemoveCompleted,
    handleCompleteAll,
  } = props;
  return (
    <div>
      <RadioGroup
        name="filter"
        defaultSelected={currentFilter}
        onChange={(e, value) => handleFilter(value)}
        style={styles.radioButtonGroup}
      >
        <FormControlLabel value="all" control={<Radio color="primary" />} label="all" />
        <FormControlLabel value="active" control={<Radio color="primary" />} label="active" />
        <FormControlLabel value="completed" control={<Radio color="primary" />} label="completed" />
      </RadioGroup>
      <div>
        <IconButton onClick={() => handleUnselect(todos)}>
          <Icon
            className="material-icons"
            color="error"
          >
            clear
          </Icon>
        </IconButton>
        <IconButton onClick={handleCompleteAll}>
          <Icon
            className="material-icons"
            color="success"
          >
            done_all
          </Icon>
        </IconButton>
        <IconButton onClick={() => handleFilterCheck(todos)}>
          <Icon
            className="material-icons"
            color="info"
          >
            check
          </Icon>
        </IconButton>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  radioButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 20px',
    flexDirection: 'row'
  },
  radioButton: {
    // width: 100,
    marginRight: 10,
  },
};

export default TodoActions;