import {
  tasksReducer,
  removeTaskAC,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
} from './task-reducer';
import { TasksStateType } from '../../App';
import { AddTodolistAc, RemoveTodolistAC } from './todolists-reducer';
import { TaskPrioties, TaskStatuses } from '../../api/todolists-api';

test('correctm task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    todolist1: [
      {
        id: '1',
        title: 'CSS',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Js',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Redux',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
    ],

    todolist2: [
      {
        id: '1',
        title: 'Terminator',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Marvel',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'Iron Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Spider Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
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
      {
        id: '1',
        title: 'CSS',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Js',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Redux',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
    ],

    todolist2: [
      {
        id: '1',
        title: 'Terminator',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Marvel',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'Iron Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Spider Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
    ],
  };

  const action = addTaskAC('Super Man', 'todolist2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolist1'].length).toBe(4);
  expect(endState['todolist2'].length).toBe(5);
  expect(endState['todolist2'][0].id).toBeDefined();
  expect(endState['todolist2'][0].title).toBe('Super Man');
  expect(endState['todolist2'][0].completed).toBe(false);
});

test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    todolist1: [
      {
        id: '1',
        title: 'CSS',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Js',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Redux',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
    ],

    todolist2: [
      {
        id: '1',
        title: 'Terminator',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Marvel',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'Iron Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Spider Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
    ],
  };

  const action = changeTaskStatusAC('2', false, 'todolist2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolist2'][1].completed).toBe(false);
  expect(endState['todolist1'][1].completed).toBe(true);
  expect(endState['todolist2'][0].id).toBeDefined();
  expect(endState['todolist2'][1].title).toBe('Marvel');
  expect(endState['todolist2'][1].completed).toBe(false);
});

test('title of specified task should be changed', () => {
  const startState: TasksStateType = {
    todolist1: [
      {
        id: '1',
        title: 'CSS',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Js',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Redux',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
    ],

    todolist2: [
      {
        id: '1',
        title: 'Terminator',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Marvel',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'Iron Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Spider Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
    ],
  };

  const action = changeTaskTitleAC('2', 'Tor', 'todolist2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolist2'][1].title).toBe('Tor');
  expect(endState['todolist1'][1].title).toBe('Js');
});

test('new property with array should be added when new todolis is added', () => {
  const startState: TasksStateType = {
    todolist1: [
      {
        id: '1',
        title: 'CSS',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Js',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Redux',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
    ],

    todolist2: [
      {
        id: '1',
        title: 'Terminator',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Marvel',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'Iron Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Spider Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
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

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    todolist1: [
      {
        id: '1',
        title: 'CSS',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Js',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Redux',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
    ],

    todolist2: [
      {
        id: '1',
        title: 'Terminator',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'Marvel',
        completed: true,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'Iron Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
      {
        id: '4',
        title: 'Spider Man',
        completed: false,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPrioties.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 0,
        addedDate: '',
      },
    ],
  };

  const action = RemoveTodolistAC('todolist2');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolist2']).not.toBeDefined();
});
