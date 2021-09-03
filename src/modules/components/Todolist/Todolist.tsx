import React, { useCallback, useEffect } from 'react';
import './Todolist.scss';
import AddItemForm from '../AddItemForm/AddItemForm';
import ButtonFilter from '../Button/Button';
import EditTableSpan from '../EditTableSpan/EditTableSpan';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Task from '../Task/Task';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../state/store/store';
import { KeyType } from '../../state/todolists-reducer';
import { TaskType } from '../../../api/todolists-api';
import { addTaskTC, fetchTasksTC, UpdateDomainTaskModelType } from '../../state/task-reducer';
import { RequestStatusType } from '../../state/appReducer';

type PropsType = {
  title: string;
  changeFilter: (changeValue: KeyType, filterId: string) => void;
  filterTask: KeyType;
  id: string;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, title: string) => void;
  addTaskAC: (task: TaskType) => void;
  updateTaskTC: (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => void;
  entityStatus: RequestStatusType;
};

const Todolist = React.memo((props: PropsType) => {
  useEffect(() => {
    dispatch(fetchTasksTC(props.id));
  }, []);

  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.task[props.id]);

  const changeAllFilter = useCallback(() => props.changeFilter('all', props.id), [props]);
  const changeActiveFilter = useCallback(() => props.changeFilter('active', props.id), [props]);
  const changeCompletedFilter = useCallback(() => props.changeFilter('complited', props.id), [
    props,
  ]);

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
      dispatch(addTaskTC(props.id, title));
    },
    [dispatch, props]
  );

  let taskTodolist = tasks;
  if (props.filterTask === 'active') {
    taskTodolist = tasks.filter(list => list.completed === false);
  }
  if (props.filterTask === 'complited') {
    taskTodolist = tasks.filter(list => list.completed === true);
  }

  return (
    <div>
      <h3>
        <EditTableSpan title={props.title} onChange={changeTodoListTitle} />
        <IconButton
          aria-label="delete"
          onClick={removeTodoList}
          disabled={props.entityStatus === 'loading'}
        >
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} entityStatus={props.entityStatus} />
      <ul className="todolist__list__wrapper">
        {taskTodolist.map(list => (
          <Task
            key={list.id}
            task={list}
            id={props.id}
            addTaskAC={props.addTaskAC}
            updateTaskTC={props.updateTaskTC}
          />
        ))}
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
