import React from 'react';
import { v1 } from 'uuid';
import { TaskStatuses, TaskType, todolistsAPI, UpdateTaskType } from '../../api/todolists-api';
import { TasksStateType } from '../../App';
import {
  AddTodolistAc,
  RemoveTodolistAC,
  REMOVE_TODOLIST,
  ADD_TODOLIST,
  setTodolistsAC,
} from './todolists-reducer';
import { Dispatch } from 'redux';
import { AppRootState } from './store/store';

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASKS';
const CHANGE_TASK = 'CHANGE-TASK';
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';

type ActionsTypes =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskAC>
  | ReturnType<typeof AddTodolistAc>
  | ReturnType<typeof RemoveTodolistAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setTasksAC>;

const initialState: TasksStateType = {};
export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsTypes
): TasksStateType => {
  switch (action.type) {
    case 'SET-TODOLISTS':
      const stateCopy1 = { ...state };
      action.todolists.forEach(list => {
        stateCopy1[list.id] = [];
      });
      return stateCopy1;

    case 'SET-TASKS': {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = action.tasks;
      return stateCopy;
    }
    case REMOVE_TASK: {
      const tasks = state[action.todolistId];
      const filterTask = tasks.filter(list => list.id !== action.taskId);
      state[action.todolistId] = filterTask;
      return { ...state };
    }
    case ADD_TASK: {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.task.todoListId];
      const newTasks = [action.task, ...tasks];
      stateCopy[action.task.todoListId] = newTasks;
      return stateCopy;
    }

    case CHANGE_TASK: {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(list =>
          list.id === action.taskId ? { ...list, ...action.model } : list
        ),
      };
    }

    case ADD_TODOLIST: {
      const stateCopy = { ...state };
      stateCopy[action.todolist.id] = [];
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
export const addTaskAC = (task: TaskType) => {
  return {
    type: ADD_TASK,
    task,
  } as const;
};

export const changeTaskAC = (
  taskId: string,
  todolistId: string,
  model: UpdateDomainTaskModelType
) => {
  return {
    type: CHANGE_TASK,
    taskId,
    model,
    todolistId,
  } as const;
};

// export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
//   return {
//     type: CHANGE_TASK_TITLE,
//     taskId,
//     todolistId,
//     title,
//   } as const;
// };

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
  return { type: 'SET-TASKS', tasks, todolistId } as const;
};

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId).then(res => {
      const tasks = res.data.items;
      const action = setTasksAC(tasks, todolistId);
      dispatch(action);
    });
  };
};

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.deleteTasks(todolistId, taskId).then(res => {
    const action = removeTaskAC(taskId, todolistId);
    dispatch(action);
  });
};

export const addTaskTC = (todoID: string, taskTitle: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTask(todoID, taskTitle).then(res => {
    let task = res.data.data.item;
    dispatch(addTaskAC(task));
  });
};

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

export const updateTaskTC = (
  todoId: string,
  taskId: string,
  domainModel: UpdateDomainTaskModelType
) => (dispatch: Dispatch, getState: () => AppRootState) => {
  const appState = getState();
  const allTasks = appState.task;
  const tasksForClickedTodo = allTasks[todoId];

  const clickedTask = tasksForClickedTodo.find(t => {
    return t.id === taskId;
  });

  if (clickedTask) {
    const model: UpdateTaskType = {
      title: clickedTask.title,
      status: clickedTask.status,
      priority: clickedTask.priority,
      description: clickedTask.description,
      startDate: clickedTask.startDate,
      deadline: clickedTask.deadline,
      completed: clickedTask.completed,
      ...domainModel,
    };

    todolistsAPI.updateTask(todoId, taskId, model).then(res => {
      dispatch(changeTaskAC(taskId, todoId, domainModel));
    });
  }
};
