import { createStore, combineReducers } from 'redux';
import { tasksReducer } from '../task-reducer';
import { todolistReducer } from '../todolists-reducer';

const rootReducers = combineReducers({ task: tasksReducer, todolist: todolistReducer });

export  type AppRootState = ReturnType<typeof rootReducers>;

export const store = createStore(rootReducers);

// @ts-ignore
window.store = store;
