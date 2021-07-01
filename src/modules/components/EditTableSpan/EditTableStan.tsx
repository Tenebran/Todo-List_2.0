import React, { useState, ChangeEvent } from 'react';

type EditTableSpanPropsType = {
  title: string;
  nameClass?: string;
  onChange: (newValue: string) => void;
};

export default function EditTableStan(props: EditTableSpanPropsType) {
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
    <input onBlur={activeModeOff} value={title} autoFocus onChange={onChangeTitleHandler}></input>
  ) : (
    <span onDoubleClick={activeModeOn} className={props.nameClass}>
      {props.title}
    </span>
  );
}
