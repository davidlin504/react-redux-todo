import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';

const Header = (props) => {
  const { onSubmit } = props
  const [text, setText] = useState('')


  const onChange = e => {
    const { value: text } = e.target;
    setText(text)
  };

  const onKeyDown = e => {
    const { value } = e.target;

    if (e.which === 13) {
      onSubmit(value);

      setText('')
    }
  };

  return (
    <TextField
      hintText="What do you need to do?"
      floatingLabelText="What do you need to do?"
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

export default Header;