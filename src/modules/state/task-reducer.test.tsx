import {
  tasksReducer,
  removeTaskAC,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
} from './task-reducer';
import { TasksStateType } from '../../App';
import { AddTodolistAc } from './todolists-reducer';

test('correctm task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    todolist1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
      { id: '4', title: 'Redux', isDone: false },
    ],

    todolist2: [
      { id: '1', title: 'Terminator', isDone: true },
      { id: '2', title: 'Marvel', isDone: true },
      { id: '3', title: 'Iron Man', isDone: false },
      { id: '4', title: 'Spider Man', isDone: false },
    ],
  };

  const action = removeTaskAC('2', 'todolist2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolist1'].length).toBe(4);
  expect(endState['todolist2'].length).toBe(3);
  expect(endState['todolist2'].every(t => t.id != '2')).toBeTruthy();
});

test('correctm task should be added from correct array', () => {
  const startState: TasksStateType = {
    todolist1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
      { id: '4', title: 'Redux', isDone: false },
    ],

    todolist2: [
      { id: '1', title: 'Terminator', isDone: true },
      { id: '2', title: 'Marvel', isDone: true },
      { id: '3', title: 'Iron Man', isDone: false },
      { id: '4', title: 'Spider Man', isDone: false },
    ],
  };

  const action = addTaskAC('Super Man', 'todolist2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolist1'].length).toBe(4);
  expect(endState['todolist2'].length).toBe(5);
  expect(endState['todolist2'][0].id).toBeDefined();
  expect(endState['todolist2'][0].title).toBe('Super Man');
  expect(endState['todolist2'][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    todolist1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
      { id: '4', title: 'Redux', isDone: false },
    ],

    todolist2: [
      { id: '1', title: 'Terminator', isDone: true },
      { id: '2', title: 'Marvel', isDone: true },
      { id: '3', title: 'Iron Man', isDone: false },
      { id: '4', title: 'Spider Man', isDone: false },
    ],
  };

  const action = changeTaskStatusAC('2', false, 'todolist2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolist2'][1].isDone).toBe(false);
  expect(endState['todolist1'][1].isDone).toBe(true);
  expect(endState['todolist2'][0].id).toBeDefined();
  expect(endState['todolist2'][1].title).toBe('Marvel');
  expect(endState['todolist2'][1].isDone).toBe(false);
});

test('title of specified task should be changed', () => {
  const startState: TasksStateType = {
    todolist1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
      { id: '4', title: 'Redux', isDone: false },
    ],

    todolist2: [
      { id: '1', title: 'Terminator', isDone: true },
      { id: '2', title: 'Marvel', isDone: true },
      { id: '3', title: 'Iron Man', isDone: false },
      { id: '4', title: 'Spider Man', isDone: false },
    ],
  };

  const action = changeTaskTitleAC('2', 'Tor', 'todolist2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolist2'][1].title).toBe('Tor');
  expect(endState['todolist1'][1].title).toBe('JS');
});

test('new property with array should be added when new todolis is added', () => {
  const startState: TasksStateType = {
    todolist1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
      { id: '4', title: 'Redux', isDone: false },
    ],

    todolist2: [
      { id: '1', title: 'Terminator', isDone: true },
      { id: '2', title: 'Marvel', isDone: true },
      { id: '3', title: 'Iron Man', isDone: false },
      { id: '4', title: 'Spider Man', isDone: false },
    ],
  };

  const action = AddTodolistAc('new todolist');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != 'todolist1' && k != 'todolist2');

  if (!newKey) {
    throw Error('new key should be added');
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
