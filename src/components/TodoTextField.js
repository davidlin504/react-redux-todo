import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';

const TodoTextField = (props) => {
  const {
    onSubmit,
    placeholder = 'What do you need to do?',
    helperText = 'What do you need to do?',
    clearInput = true } = props
  const [text, setText] = useState('')


  const onChange = e => {
    const { value: text } = e.target;
    setText(text)
  };

  const onKeyDown = e => {
    const { value } = e.target;

    if (e.which === 13) {
      onSubmit(value);

      if (clearInput) {
        setText('')
      }
    }
  };

  return (
    <TextField
      placeholder={placeholder}
      helperText={helperText}
      value={text}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={styles.textField}
    />
  );
}

const styles = {
  textField: {
    width: '100%',
    fontSize: 20,
  },
};

export default TodoTextField;