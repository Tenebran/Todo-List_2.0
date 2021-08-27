import { createStore, combineReducers, applyMiddleware } from 'redux';
import { tasksReducer } from '../task-reducer';
import { todolistReducer } from '../todolists-reducer';
import thunk from 'redux-thunk';

const rootReducers = combineReducers({ task: tasksReducer, todolist: todolistReducer });

export type AppRootState = ReturnType<typeof rootReducers>;

export const store = createStore(rootReducers, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
