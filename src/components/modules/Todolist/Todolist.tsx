import React from 'react';
import { KeyType } from '../../../App';

export type TasksType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTask: (id: number) => void;
  changeFilter: (changeValue: KeyType) => void;
};

export default function Todolist(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(list => (
          <li key={list.id}>
            <input type="checkbox" checked={list.isDone} />
            <span>{list.title}</span>
            <button onClick={() => props.removeTask(list.id)}>X</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => props.changeFilter('all')}>All</button>
        <button onClick={() => props.changeFilter('active')}>Active</button>
        <button onClick={() => props.changeFilter('complited')}>Completed</button>
      </div>
    </div>
  );
}
