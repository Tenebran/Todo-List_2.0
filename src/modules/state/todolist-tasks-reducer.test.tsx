import { TasksStateType, TodolistType } from '../../App';
import { tasksReducer } from './task-reducer';
import { AddTodolistAc, todolistReducer } from './todolists-reducer';

test('new property with array should be added when new todolis is added', () => {
  const startTaskState: TasksStateType = {};
  const startTodolistsState: Array<TodolistType> = [];

  const action = AddTodolistAc('new todolist');
  const endTasksState = tasksReducer(startTaskState, action);
  const endTodolistState = todolistReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFormTasks = keys[0];
  const idFormTodolists = endTodolistState[0].id;

  expect(idFormTasks).toBe(action.todolistId);
  expect(idFormTodolists).toBe(action.todolistId);
});
