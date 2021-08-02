import { Favorite, FavoriteBorder } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import React, { ChangeEvent } from 'react';
import './Task.scss';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../../state/task-reducer';
import { useDispatch } from 'react-redux';
import EditTableSpan from '../EditTableSpan/EditTableStan';

type TaskProps = {
  id: string;
  listIsDone: boolean;
  listId: string;
  title: string;
};

const Task = (props: TaskProps) => {
  const dispatch = useDispatch();
  const onClickHandlerRemove = () => dispatch(removeTaskAC(props.listId, props.id));
  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(changeTaskStatusAC(props.listId, newIsDoneValue, props.id));
  };
  const changeTitleHandler = (newValue: string) => {
    dispatch(changeTaskTitleAC(props.id, newValue, props.id));
  };

  return (
    <li className="todolist__list">
      <Checkbox
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        name="checked"
        checked={props.listIsDone}
        onChange={e => changeStatusHandler(e)}
      />

      <EditTableSpan
        title={props.title}
        nameClass={props.listIsDone ? 'todolist__done' : ''}
        onChange={changeTitleHandler}
      />
      <IconButton aria-label="delete" onClick={e => onClickHandlerRemove()}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
};

export default Task;
