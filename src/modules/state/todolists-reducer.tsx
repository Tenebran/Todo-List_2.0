import { Dispatch } from 'redux';
import { v1 } from 'uuid';
import { todolistsAPI, TodoListType } from '../../api/todolists-api';
import { AppRootState } from './store/store';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export const ADD_TODOLIST = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTE = 'CHANGE-TODOLIST-FILTER';

export type ActionsTypes =
  | ReturnType<typeof RemoveTodolistAC>
  | ReturnType<typeof AddTodolistAc>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistsAC>;

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
    case 'SET-TODOLISTS': {
      return action.todolists.map(list => {
        return { ...list, filter: 'all' };
      });
    }

    case REMOVE_TODOLIST:
      return state.filter(list => list.id !== action.id);

    case ADD_TODOLIST: {
      const newTodolist: TodolistDomainType = { ...action.todolist, filter: 'all' };
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

export const AddTodolistAc = (todolist: TodoListType) => {
  return {
    type: ADD_TODOLIST,
    todolist,
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

export const setTodolistsAC = (todolists: Array<TodoListType>) => {
  return { type: 'SET-TODOLISTS', todolists } as const;
};

export const fetchTodolistsThunk = (dispatch: Dispatch, getState: () => AppRootState) => {
  todolistsAPI.getTodolists().then(res => {
    let action = setTodolistsAC(res.data);
    dispatch(action);
  });
};

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.deleteTodoList(todolistId).then(res => {
    dispatch(RemoveTodolistAC(todolistId));
  });
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTodolists(title).then(resp => {
    dispatch(AddTodolistAc(resp.data.data.item));
  });
};

export const changeTodolistTitleTC = (todolisID: string, title: string) => (dispatch: Dispatch) => {
  todolistsAPI.updateTodolist(todolisID, title).then(resp => {
    dispatch(changeTodolistTitleAC(title, todolisID));
  });
};
