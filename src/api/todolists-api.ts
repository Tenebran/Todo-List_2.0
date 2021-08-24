import axios from 'axios';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': 'e2aa960b-33d4-4875-9d72-648602b61592',
  },
};

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings,
});

export type UpdateTaskType = {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

export type TodoListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPrioties {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPrioties;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type GetTaskResponse = {
  error: string | null;
  totalCount: number;
  items: Array<TaskType | null>;
};

export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodoListType>>('todo-lists');
  },

  createTodolists(title: string) {
    return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', { title });
  },

  deleteTodoList(todolisID: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolisID}`);
  },

  updateTodolist(todolisID: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolisID}`, { title });
  },

  getTasks(todolistID: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistID}/tasks`);
  },
  deleteTasks(todolistID: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskId}`);
  },
};
