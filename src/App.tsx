import React, { useCallback, useEffect } from 'react';
import Todolist from './modules/components/Todolist/Todolist';
import './App.scss';
import AddItemForm from './modules/components/AddItemForm/AddItemForm';
import AppBar from '@material-ui/core/AppBar';
import { Container, Toolbar, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {
  changeTodolistFilterAC,
  KeyType,
  TodolistDomainType,
  fetchTodolistsThunk,
  removeTodolistTC,
  addTodolistTC,
  changeTodolistTitleTC,
} from './modules/state/todolists-reducer';
import { addTaskAC, updateTaskTC } from './modules/state/task-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './modules/state/store/store';
import { TaskType } from './api/todolists-api';
import LinearProgress from '@material-ui/core/LinearProgress';
import { RequestStatusType } from './modules/state/appReducer';
import { ErrorSnackbar } from './modules/components/ErrorSnackbar/ErrorSnackbar';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const App = React.memo(() => {
  useEffect(() => {
    dispatch(fetchTodolistsThunk);
  }, []);

  const dispatch = useDispatch();
  const todolist = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolist);
  const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status);
  console.log(status);

  const addItem = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (changeValue: KeyType, todolistId: string) => {
      const action = changeTodolistFilterAC(changeValue, todolistId);
      dispatch(action);
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      dispatch(changeTodolistTitleTC(id, title));
    },
    [dispatch]
  );

  console.log(todolist);

  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar className="header">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit" variant={'outlined'}>
            Login
          </Button>
        </Toolbar>
        {status === 'loading' ? <LinearProgress color="secondary" /> : ''}
      </AppBar>

      <Container fixed className="todoList__form">
        <Grid container justify="center">
          <AddItemForm addItem={addItem} />
        </Grid>

        <Grid container spacing={3}>
          {todolist.map(list => {
            return (
              <Grid item key={list.id}>
                <Paper elevation={3} className="paper__style">
                  <Todolist
                    title={list.title}
                    changeFilter={changeFilter}
                    filterTask={list.filter}
                    id={list.id}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    addTaskAC={addTaskAC}
                    updateTaskTC={updateTaskTC}
                    entityStatus={list.entityStatus}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <ErrorSnackbar />
    </div>
  );
});

export default App;
