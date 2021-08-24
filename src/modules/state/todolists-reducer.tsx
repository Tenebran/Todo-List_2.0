import { v1 } from 'uuid';
import { TodoListType } from '../../api/todolists-api';

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
const initialState: Array<TodolistDomainType> = [];

export type KeyType = 'all' | 'complited' | 'active';

export type TodolistDomainType = TodoListType & {
  filter: KeyType;
};

export const todolistReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsTypes
): Array<TodolistDomainType> => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(list => list.id !== action.id);

    case ADD_TODOLIST: {
      return [
        { title: action.title, id: action.todolistId, filter: 'all', addedDate: '', order: 0 },
        ...state,
      ];
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
