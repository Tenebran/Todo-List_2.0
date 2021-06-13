import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { KeyType } from '../../../App';
import './Todolist.scss';

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTask: (id: string) => void;
  changeFilter: (changeValue: KeyType) => void;
  addTask: (newValue: string) => void;
  changeStatus: (id: string, isDone: boolean) => void;
  filterTask: KeyType;
};

export default function Todolist(props: PropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      if (newTaskTitle.trim() !== '') {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
      } else {
        setError('Field is required');
      }
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
      setError(null);
    } else {
      setError('Field is required');
    }
  };

  const changeAllFilter = () => props.changeFilter('all');
  const changeActiveFilter = () => props.changeFilter('active');
  const changeCompletedFilter = () => props.changeFilter('complited');

  return (
    <div>
      <h3>{props.title}</h3>
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
      <ul>
        {props.tasks.map(list => (
          <li key={list.id} className={list.isDone ? 'todolist__done' : ''}>
            <input
              type="checkbox"
              checked={list.isDone}
              onChange={e => props.changeStatus(list.id, e.currentTarget.checked)}
            />
            <span>{list.title}</span>
            <button onClick={e => props.removeTask(list.id)}>X</button>
          </li>
        ))}
      </ul>
      <div>
        <button
          className={props.filterTask === 'all' ? 'button__filter' : ''}
          onClick={changeAllFilter}
        >
          All
        </button>
        <button
          className={props.filterTask === 'active' ? 'button__filter' : ''}
          onClick={changeActiveFilter}
        >
          Active
        </button>
        <button
          className={props.filterTask === 'complited' ? 'button__filter' : ''}
          onClick={changeCompletedFilter}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
