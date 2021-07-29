import React from 'react';
import Todolist, { TasksType } from './modules/components/Todolist/Todolist';
import './App.scss';
import AddItemForm from './modules/components/AddItemForm/AddItemForm';
import AppBar from '@material-ui/core/AppBar';
import { Container, Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from './modules/state/task-reducer';
import {
  AddTodolistAc,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  RemoveTodolistAC,
} from './modules/state/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './modules/state/store/store';

export type KeyType = 'all' | 'complited' | 'active';

export type TodolistType = {
  id: string;
  title: string;
  filter: KeyType;
};

export type TasksStateType = {
  [key: string]: Array<TasksType>;
};

function App() {
  const dispatch = useDispatch();
  const todolist = useSelector<AppRootState, Array<TodolistType>>(state => state.todolist);
  // const tasks = useSelector<AppRootState, TasksStateType>(state => state.task);

  function addItem(title: string) {
    const action = AddTodolistAc(title);
    dispatch(action);
  }

  function changeFilter(changeValue: KeyType, todolistId: string) {
    const action = changeTodolistFilterAC(changeValue, todolistId);
    dispatch(action);
  }

  function removeTodolist(todolistId: string) {
    const action = RemoveTodolistAC(todolistId);
    dispatch(action);
  }
  function changeTodolistTitle(id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatch(action);
  }

  // function removeTask(id: string, todolistId: string) {
  //   const action = removeTaskAC(id, todolistId);
  //   dispatch(action);
  // }

  // function addTask(newValue: string, todolistId: string) {
  //   const action = addTaskAC(newValue, todolistId);
  //   dispatch(action);
  // }

  // function changeStatus(id: string, isDone: boolean, todolistId: string) {
  //   const action = changeTaskStatusAC(id, isDone, todolistId);
  //   dispatch(action);
  // }

  // function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
  //   const action = changeTaskTitleAC(id, newTitle, todolistId);
  //   dispatch(action);
  // }

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
      </AppBar>
      <Container fixed>
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
                    // tasks={taskTodolist}
                    // removeTask={removeTask}
                    changeFilter={changeFilter}
                    // addTask={addTask}
                    // changeStatus={changeStatus}
                    filterTask={list.filter}
                    id={list.id}
                    removeTodolist={removeTodolist}
                    // changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
