import { createStore, combineReducers, applyMiddleware } from 'redux';
import { tasksReducer } from '../task-reducer';
import { todolistReducer } from '../todolists-reducer';
import { appReducer } from '../appReducer';
import thunk from 'redux-thunk';

const rootReducers = combineReducers({
  task: tasksReducer,
  todolist: todolistReducer,
  app: appReducer,
});

export type AppRootState = ReturnType<typeof rootReducers>;

export const store = createStore(rootReducers, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
