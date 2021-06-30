import React, { useState } from 'react';
import Todolist, { TasksType } from './modules/components/Todolist/Todolist';
import './App.css';
import { v1 } from 'uuid';
import AddItemForm from './modules/components/AddItemForm/AddItemForm';

export type KeyType = 'all' | 'complited' | 'active';

type TodolistType = {
  id: string;
  title: string;
  filter: KeyType;
};

type TasksStateType = {
  [key: string]: Array<TasksType>;
};

function App() {
  let todolist1 = v1();
  let todolist2 = v1();

  let [todolist, setTodolist] = useState<Array<TodolistType>>([
    { id: todolist1, title: 'What To Learn', filter: 'all' },
    { id: todolist2, title: 'Movies', filter: 'complited' },
  ]);

  let [tasks1, setTasks1] = useState<TasksStateType>({
    [todolist1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
    ],

    [todolist2]: [
      { id: v1(), title: 'Terminator', isDone: true },
      { id: v1(), title: 'Marvel', isDone: true },
      { id: v1(), title: 'Iron Man', isDone: false },
      { id: v1(), title: 'Spider Man', isDone: false },
    ],
  });

  function addItem(title: string) {
    const newItem: TodolistType = { id: v1(), title: title, filter: 'all' };
    setTodolist([newItem, ...todolist]);
    setTasks1({ ...tasks1, [newItem.id]: [] });
  }

  function changeFilter(changeValue: KeyType, todolistId: string) {
    let newTodolist = todolist.find(list => list.id === todolistId);
    if (newTodolist) {
      newTodolist.filter = changeValue;
    }
    setTodolist([...todolist]);
  }

  function removeTodolist(todolistId: string) {
    let filterTodolist = todolist.filter(list => list.id !== todolistId);
    setTodolist(filterTodolist);
    delete tasks1[todolistId];
    setTasks1({ ...tasks1 });
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasks1[todolistId];
    let filterTask = tasks.filter(list => list.id !== id);
    tasks1[todolistId] = filterTask;
    setTasks1({ ...tasks1 });
  }

  function addTask(newValue: string, todolistId: string) {
    let task = { id: v1(), title: newValue, isDone: false };
    let tasks = tasks1[todolistId];
    let newTask = [task, ...tasks];
    tasks1[todolistId] = newTask;
    setTasks1({ ...tasks1 });
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    let tasks = tasks1[todolistId];
    let task = tasks.find(list => list.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks1({ ...tasks1 });
    }
  }

  return (
    <div className="App">
      <AddItemForm addItem={addItem} />
      {todolist.map(list => {
        let taskTodolist = tasks1[list.id];
        if (list.filter === 'active') {
          taskTodolist = tasks1[list.id].filter(list => !list.isDone);
        }
        if (list.filter === 'complited') {
          taskTodolist = tasks1[list.id].filter(list => list.isDone);
        }

        return (
          <Todolist
            key={list.id}
            title={list.title}
            tasks={taskTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filterTask={list.filter}
            id={list.id}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
