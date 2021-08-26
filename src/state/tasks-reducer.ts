import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  setTodoListAC,
} from './todolists-reducer';
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI } from '../api/todolists-api';
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  todolistId: string;
  taskId: string;
};

export type AddTaskActionType = {
  type: 'ADD-TASK';
  task: TaskType;
};

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS';
  todolistId: string;
  taskId: string;
  status: TaskStatuses;
};

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE';
  todolistId: string;
  taskId: string;
  title: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | ReturnType<typeof setTodoListAC>
  | ReturnType<typeof setTasksAC>;
const initialState: TasksStateType = {
  /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/
};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'SET-TASKS': {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = action.tasks;
      return stateCopy;
    }

    case 'SET-TODOLISTS': {
      let stateCopy = { ...state };
      action.todoList.forEach(list => {
        stateCopy[list.id] = [];
      });

      return stateCopy;
    }

    case 'REMOVE-TASK': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter(t => t.id !== action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = { ...state };

      const tasks = stateCopy[action.task.todoListId];
      const newTasks = [action.task, ...tasks];
      stateCopy[action.task.todoListId] = newTasks;
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks.map(t =>
        t.id === action.taskId ? { ...t, status: action.status } : t
      );

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks.map(t =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      );

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }
    case 'REMOVE-TODOLIST': {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId };
};
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return { type: 'ADD-TASK', task };
};
export const changeTaskStatusAC = (
  taskId: string,
  status: TaskStatuses,
  todolistId: string
): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', status, todolistId, taskId };
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId };
};

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
  return { type: 'SET-TASKS', tasks, todolistId } as const;
};

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId).then(res => {
      const action = setTasksAC(res.data.items, todolistId);
      dispatch(action);
    });
  };
};

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.deleteTask(todolistId, taskId).then(res => {
    const action = removeTaskAC(taskId, todolistId);
    dispatch(action);
  });
};

export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTask(todoId, title).then(resp => {
    dispatch(addTaskAC(resp.data.data.item));
  });
};

export const updateTaskStatusTC = (todoId: string, taskId: string, status: TaskStatuses) => (
  dispatch: Dispatch,
  getState: () => AppRootStateType
) => {
  const state = getState();
  const allTasks = state.tasks;
  const tasksForClickedTodo = allTasks[todoId];
  const currentTask = tasksForClickedTodo.find(task => {
    return task.id === taskId;
  });

  let model: any;
  if (currentTask) {
    model = {
      title: currentTask?.title,
      status: status,
      description: currentTask?.description,
      deadline: currentTask?.description,
      startDate: currentTask?.startDate,
      priority: currentTask?.priority,
    };
  }

  todolistsAPI.updateTask(todoId, taskId, model).then(res => {
    dispatch(changeTaskStatusAC(todoId, status, taskId));
  });
};
