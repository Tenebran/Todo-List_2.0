import { Favorite, FavoriteBorder } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import React, { ChangeEvent, useCallback } from 'react';
import './Task.scss';
import { useDispatch } from 'react-redux';
import EditTableSpan from '../EditTableSpan/EditTableSpan';
import { TaskStatuses, TaskType } from '../../../api/todolists-api';
import { removeTaskTC, UpdateDomainTaskModelType } from '../../state/task-reducer';

type TaskProps = {
  id: string;
  task: TaskType;
  addTaskAC: (task: TaskType) => void;
  updateTaskTC: (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => void;
};

const Task = React.memo((props: TaskProps) => {
  const dispatch = useDispatch();
  const onClickHandlerRemove = () => dispatch(removeTaskTC(props.task.id, props.id));
  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(props.updateTaskTC(props.id, props.task.id, { status }));
  };
  const changeTitleHandler = useCallback(
    (title: string) => {
      dispatch(props.updateTaskTC(props.id, props.task.id, { title }));
    },
    [props, dispatch]
  );

  return (
    <li className="todolist__list">
      <Checkbox
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        name="checked"
        checked={props.task.status === TaskStatuses.Completed ? true : false}
        onChange={e => changeStatusHandler(e)}
      />

      <EditTableSpan
        title={props.task.title}
        nameClass={props.task.status === TaskStatuses.Completed ? 'todolist__done' : ''}
        onChange={changeTitleHandler}
      />
      <IconButton aria-label="delete" onClick={e => onClickHandlerRemove()}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
});

export default Task;
