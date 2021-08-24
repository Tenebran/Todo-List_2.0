import { v1 } from 'uuid';
import { TaskPrioties, TaskStatuses } from '../../api/todolists-api';
import { TasksStateType } from '../../App';
import {
  AddTodolistAc,
  RemoveTodolistAC,
  REMOVE_TODOLIST,
  ADD_TODOLIST,
} from './todolists-reducer';

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASKS';
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS';
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';

type ActionsTypes =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof AddTodolistAc>
  | ReturnType<typeof RemoveTodolistAC>;

const initialState: TasksStateType = {};
export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsTypes
): TasksStateType => {
  switch (action.type) {
    case REMOVE_TASK: {
      const tasks = state[action.todolistId];
      const filterTask = tasks.filter(list => list.id !== action.taskId);
      state[action.todolistId] = filterTask;
      return { ...state };
    }
    case ADD_TASK: {
      const newTask = {
        id: v1(),
        title: action.title,
        status: TaskStatuses.New,
        description: '',
        completed: false,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: action.id,
        order: 0,
        addedDate: '',
      };
      const newTasks = [newTask, ...state[action.id]];
      state[action.id] = newTasks;

      return { ...state };
    }

    case CHANGE_TASK_STATUS: {
      let todolistTask = state[action.todolistId];
      state[action.todolistId] = todolistTask.map(list =>
        list.id === action.taskId ? { ...list, completed: action.completed } : list
      );

      return { ...state };
    }

    case CHANGE_TASK_TITLE: {
      let todolistTask = state[action.todolistId];
      state[action.todolistId] = todolistTask.map(list =>
        list.id === action.taskId ? { ...list, title: action.title } : list
      );
      return { ...state };
    }

    case ADD_TODOLIST: {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy;
    }

    case REMOVE_TODOLIST: {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: REMOVE_TASK, taskId, todolistId } as const;
};

export const addTaskAC = (newTodolistTitle: string, id: string) => {
  return {
    type: ADD_TASK,
    title: newTodolistTitle,
    id,
  } as const;
};

export const changeTaskStatusAC = (taskId: string, completed: boolean, todolistId: string) => {
  return {
    type: CHANGE_TASK_STATUS,
    taskId,
    completed,
    todolistId,
  } as const;
};

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return {
    type: CHANGE_TASK_TITLE,
    taskId,
    todolistId,
    title,
  } as const;
};
