import React, { useState, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

type EditTableSpanPropsType = {
  title: string;
  nameClass?: string;
  onChange: (newValue: string) => void;
};

const EditTableSpan = React.memo((props: EditTableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState('');

  const activeModeOn = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activeModeOff = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      id="standard-basic"
      inputProps={{ 'aria-label': 'description' }}
      onBlur={activeModeOff}
      value={title}
      autoFocus
      onChange={onChangeTitleHandler}
      size="small"
    />
  ) : (
    <span onDoubleClick={activeModeOn} className={props.nameClass}>
      {props.title}
    </span>
  );
});

export default EditTableSpan;
