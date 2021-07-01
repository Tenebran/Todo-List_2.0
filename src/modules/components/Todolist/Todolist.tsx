import React, { ChangeEvent } from 'react';
import { KeyType } from '../../../App';
import './Todolist.scss';
import AddItemForm from '../AddItemForm/AddItemForm';
import Button from '../Button/Button';
import EditTableSpan from '../EditTableSpan/EditTableStan';

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTask: (id: string, todoId: string) => void;
  changeFilter: (changeValue: KeyType, filterId: string) => void;
  addTask: (newValue: string, todoId: string) => void;
  changeStatus: (id: string, isDone: boolean, todoId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todoId: string) => void;
  filterTask: KeyType;
  id: string;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, title: string) => void;
};

export default function Todolist(props: PropsType) {
  const changeAllFilter = () => props.changeFilter('all', props.id);
  const changeActiveFilter = () => props.changeFilter('active', props.id);
  const changeCompletedFilter = () => props.changeFilter('complited', props.id);

  const removeTodoList = () => {
    props.removeTodolist(props.id);
  };

  const changeTodoListTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditTableSpan title={props.title} onChange={changeTodoListTitle} />
        <button onClick={removeTodoList}>X</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map(list => {
          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeStatus(list.id, e.currentTarget.checked, props.id);
          const changeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(list.id, newValue, props.id);
          };
          return (
            <li key={list.id}>
              <input type="checkbox" checked={list.isDone} onChange={e => changeStatusHandler(e)} />
              <EditTableSpan
                title={list.title}
                nameClass={list.isDone ? 'todolist__done' : ''}
                onChange={changeTitleHandler}
              />
              <button onClick={e => props.removeTask(list.id, list.id)}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          callBack={changeAllFilter}
          title={'All'}
          nameClass={props.filterTask === 'all' ? 'button__filter' : ''}
        />
        <Button
          callBack={changeActiveFilter}
          title={'Active'}
          nameClass={props.filterTask === 'active' ? 'button__filter' : ''}
        />
        <Button
          callBack={changeCompletedFilter}
          title={'Completed'}
          nameClass={props.filterTask === 'complited' ? 'button__filter' : ''}
        />
      </div>
    </div>
  );
}
