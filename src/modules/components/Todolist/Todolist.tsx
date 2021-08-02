import React, { ChangeEvent, useCallback } from 'react';
import { KeyType } from '../../../App';
import './Todolist.scss';
import AddItemForm from '../AddItemForm/AddItemForm';
import ButtonFilter from '../Button/Button';
import EditTableSpan from '../EditTableSpan/EditTableStan';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Task from '../Task/Task';
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
  changeFilter: (changeValue: KeyType, filterId: string) => void;
  filterTask: KeyType;
  id: string;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, title: string) => void;
};

const Todolist = React.memo((props: PropsType) => {
  console.log('called todolist');

  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, Array<TasksType>>(state => state.task[props.id]);

  const changeAllFilter = useCallback(() => props.changeFilter('all', props.id), [props]);
  const changeActiveFilter = useCallback(() => props.changeFilter('active', props.id), [props]);
  const changeCompletedFilter = useCallback(
    () => props.changeFilter('complited', props.id),
    [props]
  );

  const removeTodoList = () => {
    props.removeTodolist(props.id);
  };

  const changeTodoListTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.id, title);
    },
    [props]
  );

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(title, props.id));
    },
    [dispatch, props.id]
  );

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
        {taskTodolist.map(list => {
          // <Task
          //   key={list.id}
          //   id={props.id}
          //   listId={list.id}
          //   listIsDone={list.isDone}
          //   title={list.title}
          // />;
          const onClickHandlerRemove = () => dispatch(removeTaskAC(list.id, props.id));
          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(list.id, newIsDoneValue, props.id));
          };
          const changeTitleHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(list.id, newValue, props.id));
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
});

export default Todolist;
