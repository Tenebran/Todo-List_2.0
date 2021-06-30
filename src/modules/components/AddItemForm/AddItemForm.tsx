import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import './AddItemForm.scss';

type addItemFormPropsType = {
  addItem: (newValue: string) => void;
};

export default function AddItemForm(props: addItemFormPropsType) {
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
    setError(null);
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
      <input
        className={error ? 'error' : ''}
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error__messages">{error}</div>}
    </div>
  );
}
