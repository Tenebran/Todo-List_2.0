import { v1 } from 'uuid';
import { TodolistType, KeyType } from '../../App';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export const ADD_TODOLIST = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTE = 'CHANGE-TODOLIST-FILTER';

export type ActionsTypes =
  | ReturnType<typeof RemoveTodolistAC>
  | ReturnType<typeof AddTodolistAc>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>;

export let todolist1 = v1();
export let todolist2 = v1();
const initialState: Array<TodolistType> = [
  { id: todolist1, title: 'What To Learn', filter: 'all' },
  { id: todolist2, title: 'Movies', filter: 'all' },
];

export const todolistReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionsTypes
): Array<TodolistType> => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(list => list.id !== action.id);

    case ADD_TODOLIST: {
      const newTodolist: TodolistType = {
        title: action.title,
        id: action.todolistId,
        filter: 'all',
      };
      return [newTodolist, ...state];
    }

    case CHANGE_TODOLIST_TITLE: {
      const todolistFind = state.find(list => list.id === action.id);
      if (todolistFind) {
        todolistFind.title = action.title;
      }
      return [...state];
    }
    case CHANGE_TODOLIST_FILTE: {
      const todolist = state.find(list => list.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }
    default:
      return state;
  }
};

export const RemoveTodolistAC = (todolistId: string) => {
  return { type: REMOVE_TODOLIST, id: todolistId } as const;
};

export const AddTodolistAc = (newTodolistTitle: string) => {
  return {
    type: ADD_TODOLIST,
    title: newTodolistTitle,
    todolistId: v1(),
  } as const;
};

export const changeTodolistTitleAC = (newTodolistTitle: string, todolistId: string) => {
  return {
    type: CHANGE_TODOLIST_TITLE,
    id: todolistId,
    title: newTodolistTitle,
  } as const;
};

export const changeTodolistFilterAC = (filter: KeyType, id: string) => {
  return {
    type: CHANGE_TODOLIST_FILTE,
    id: id,
    filter: filter,
  } as const;
};
