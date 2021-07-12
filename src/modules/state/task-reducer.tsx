import { v1 } from 'uuid';
import { TasksStateType } from '../../App';
import { AddTodolistType } from './todolists-reducer';

type RemoveTaskType = {
  type: 'REMOVE-TASK';
  taskId: string;
  todolistId: string;
};

type AddTasksType = {
  type: 'ADD-TASKS';
  title: string;
  id: string;
};

type changeTaskStatusType = {
  type: 'CHANGE-TASK-STATUS';
  taskId: string;
  IsDone: boolean;
  todolistId: string;
};

type changeTaskTitleType = {
  type: 'CHANGE-TASK-TITLE';
  taskId: string;
  title: string;
  todolistId: string;
};

type ActionsTypes =
  | RemoveTaskType
  | AddTasksType
  | changeTaskStatusType
  | changeTaskTitleType
  | AddTodolistType;

export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const tasks = state[action.todolistId];
      const filterTask = tasks.filter(list => list.id !== action.taskId);
      state[action.todolistId] = filterTask;
      return { ...state };
    }
    case 'ADD-TASKS': {
      const newTask = { id: v1(), title: action.title, isDone: false };
      const newTasks = [newTask, ...state[action.id]];
      state[action.id] = newTasks;

      return { ...state };
    }

    case 'CHANGE-TASK-STATUS': {
      let tasks = state[action.todolistId];
      let task = tasks.find(list => list.id === action.taskId);
      if (task) {
        task.isDone = action.IsDone;
      }
      return { ...state };
    }

    case 'CHANGE-TASK-TITLE': {
      let tasks = state[action.todolistId];
      let task = tasks.find(list => list.id === action.taskId);
      if (task) {
        task.title = action.title;
      }
      return { ...state };
    }

    case 'ADD-TODOLIST': {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy;
    }
    default:
      throw new Error("I don't understand this action type");
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
  return { type: 'REMOVE-TASK', taskId, todolistId };
};

export const addTaskAC = (newTodolistTitle: string, id: string): AddTasksType => {
  return {
    type: 'ADD-TASKS',
    title: newTodolistTitle,
    id,
  };
};

export const changeTaskStatusAC = (
  taskId: string,
  IsDone: boolean,
  todolistId: string
): changeTaskStatusType => {
  return {
    type: 'CHANGE-TASK-STATUS' as const,
    taskId,
    IsDone,
    todolistId,
  };
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): changeTaskTitleType => {
  return {
    type: 'CHANGE-TASK-TITLE' as const,
    taskId,
    todolistId,
    title,
  };
};
