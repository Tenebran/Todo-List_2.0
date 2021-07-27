import { v1 } from 'uuid';
import { TodolistType, KeyType } from '../../App';

import {
  AddTodolistAc,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  RemoveTodolistAC,
  todolistReducer,
} from './todolists-reducer';

test('correct todolist should be remover', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolist1, title: 'What To Learn', filter: 'all' },
    { id: todolist2, title: 'Movies', filter: 'all' },
  ];

  const endState = todolistReducer(startState, RemoveTodolistAC(todolist1));
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolist2);
});

test('correct todolist should be added', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newTodolistTitle = 'New Todolist';

  const startState: Array<TodolistType> = [
    { id: todolist1, title: 'What To Learn', filter: 'all' },
    { id: todolist2, title: 'Movies', filter: 'all' },
  ];

  const endState = todolistReducer(startState, AddTodolistAc(newTodolistTitle));
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newTodolistTitle = 'New Todolist';
  const startState: Array<TodolistType> = [
    { id: todolist1, title: 'What To Learn', filter: 'all' },
    { id: todolist2, title: 'Movies', filter: 'all' },
  ];

  const endState = todolistReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolist2));

  expect(endState[0].title).toBe('What To Learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newFilter: KeyType = 'complited';
  const startState: Array<TodolistType> = [
    { id: todolist1, title: 'What To Learn', filter: 'all' },
    { id: todolist2, title: 'Movies', filter: 'all' },
  ];

  const endState = todolistReducer(startState, changeTodolistFilterAC(newFilter, todolist2));

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});
