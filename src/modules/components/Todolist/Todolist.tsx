import React, { ChangeEvent } from 'react';
import { KeyType, TasksStateType } from '../../../App';
import './Todolist.scss';
import AddItemForm from '../AddItemForm/AddItemForm';
import ButtonFilter from '../Button/Button';
import EditTableSpan from '../EditTableSpan/EditTableStan';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../state/store/store';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../../state/task-reducer';

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  // tasks: Array<TasksType>;
  // removeTask: (id: string, todoId: string) => void;
  changeFilter: (changeValue: KeyType, filterId: string) => void;
  // addTask: (newValue: string, todoId: string) => void;
  // changeStatus: (id: string, isDone: boolean, todoId: string) => void;
  // changeTaskTitle: (id: string, newTitle: string, todoId: string) => void;
  filterTask: KeyType;
  id: string;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, title: string) => void;
};

export default function Todolist(props: PropsType) {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, Array<TasksType>>(state => state.task[props.id]);

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
    dispatch(addTaskAC(title, props.id));
  };

  let taskTodolist = tasks;
  if (props.filterTask === 'active') {
    taskTodolist = tasks.filter(list => !list.isDone);
  }
  if (props.filterTask === 'complited') {
    taskTodolist = tasks.filter(list => list.isDone);
  }

  return (
    <div>
      <h3>
        <EditTableSpan title={props.title} onChange={changeTodoListTitle} />
        <IconButton aria-label="delete" onClick={removeTodoList}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul className="todolist__list__wrapper">
        {tasks.map(list => {
          const onClickHandlerRemove = () => dispatch(removeTaskAC(list.id, props.id));
          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(list.id, newIsDoneValue, props.id));
          };
          const changeTitleHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(list.id, newValue, list.id));
          };
          return (
            <li key={list.id} className="todolist__list">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                name="checked"
                checked={list.isDone}
                onChange={e => changeStatusHandler(e)}
              />

              <EditTableSpan
                title={list.title}
                nameClass={list.isDone ? 'todolist__done' : ''}
                onChange={changeTitleHandler}
              />
              <IconButton aria-label="delete" onClick={e => onClickHandlerRemove()}>
                <DeleteIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div className="todolist__button__wrapper">
        <ButtonFilter
          callBack={changeAllFilter}
          title={'All'}
          nameClass={props.filterTask === 'all' ? 'button__filter' : ''}
        />
        <ButtonFilter
          callBack={changeActiveFilter}
          title={'Active'}
          nameClass={props.filterTask === 'active' ? 'button__filter' : ''}
        />
        <ButtonFilter
          callBack={changeCompletedFilter}
          title={'Completed'}
          nameClass={props.filterTask === 'complited' ? 'button__filter' : ''}
        />
      </div>
    </div>
  );
}
