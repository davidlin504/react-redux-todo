import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { completeFilter, toggleComplete } from '../reducers/todoSlice'
import { useDispatch } from 'react-redux';


const TodoActions = (props) => {
  const dispatch = useDispatch();

  const handleCompleteFilter = (todos) => {
    todos.map(todo => {
      dispatch(toggleComplete(todo))
    })
    // dispatch(completeFilter({todos}))
  }

  const {
    todos,
    currentFilter,
    handleFilter,
    handleRemoveCompleted,
    handleCompleteAll,
  } = props;
  return (
    <div style={styles.container}>
      <RadioGroup
        name="filter"
        defaultSelected={currentFilter}
        onChange={(e, value) => handleFilter(value)}
        style={styles.radioButtonGroup}
      >
        <Radio
          name="All"
          value="all"
          style={styles.radioButton}
        /><span>all</span>
        <Radio
          name="Active"
          value="active"
          style={styles.radioButton}
        /><span>active</span>
        <Radio
          name="Completed"
          value="completed"
          style={styles.radioButton}
        /><span>checked</span>
      </RadioGroup>
      <div>
        <IconButton onClick={handleRemoveCompleted}>
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
        <IconButton onClick={() => handleCompleteFilter(todos)}>
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
  },
  radioButton: {
    width: 100,
    marginRight: 10,
  },
};

export default TodoActions;