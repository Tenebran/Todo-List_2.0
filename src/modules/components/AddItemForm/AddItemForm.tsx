import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import './AddItemForm.scss';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

type addItemFormPropsType = {
  addItem: (newValue: string) => void;
};

const AddItemForm = React.memo((props: addItemFormPropsType) => {
  let [newTaskTitle, setNewTaskTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle);
      setNewTaskTitle('');
      setError(null);
    } else {
      setError('Field is required');
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === 'Enter') {
      if (newTaskTitle.trim() !== '') {
        props.addItem(newTaskTitle);
        setNewTaskTitle('');
      } else {
        setError('Field is required');
      }
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        label={!!error ? error : 'Type Text'}
        error={!!error}
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <IconButton color="primary" onClick={addTask} size="small">
        <NoteAddIcon fontSize="large" />
      </IconButton>
    </div>
  );
});

export default AddItemForm;
