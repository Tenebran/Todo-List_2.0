import { v1 } from 'uuid';
import { TodolistType, KeyType } from '../../App';

type RemoveTodolistType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};

type AddTodolistType = {
  type: 'ADD-TODOLIST';
  title: string;
};

type ChangeTitleTodolistType = {
  type: 'CHANGE-TODOLIST-TITLE';
  id: string;
  title: string;
};

type ChangeFilterTodolistType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: KeyType;
};

type ActionsTypes =
  | RemoveTodolistType
  | AddTodolistType
  | ChangeTitleTodolistType
  | ChangeFilterTodolistType;

export const todolistReducer = (
  state: Array<TodolistType>,
  action: ActionsTypes
): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(list => list.id !== action.id);

    case 'ADD-TODOLIST':
      return [
        ...state,
        {
          id: v1(),
          title: action.title,
          filter: 'all',
        },
      ];

    case 'CHANGE-TODOLIST-TITLE': {
      const todolistFind = state.find(list => list.id === action.id);
      if (todolistFind) {
        todolistFind.title = action.title;
      }
      return [...state];
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(list => list.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }
    default:
      throw new Error("I don't understand this action type");
  }
};

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const AddTodolistAc = (newTodolistTitle: string): AddTodolistType => {
  return {
    type: 'ADD-TODOLIST',
    title: newTodolistTitle,
  };
};

export const changeTodolistTitleAC = (
  newTodolistTitle: string,
  todolistId: string
): ChangeTitleTodolistType => {
  return {
    type: 'CHANGE-TODOLIST-TITLE' as const,
    id: todolistId,
    title: newTodolistTitle,
  };
};

export const changeTodolistFilterAC = (filter: KeyType, id: string): ChangeFilterTodolistType => {
  return {
    type: 'CHANGE-TODOLIST-FILTER' as const,
    id: id,
    filter: filter,
  };
};
