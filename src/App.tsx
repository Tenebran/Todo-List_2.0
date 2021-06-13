import React, { useState } from 'react';
import Todolist, { TasksType } from './components/modules/Todolist/Todolist';
import './App.css';
import { v1 } from 'uuid';

export type KeyType = 'all' | 'complited' | 'active';

function App() {
  let [tasks1, setTasks1] = useState<Array<TasksType>>([
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
  ]);

  let [filterTask, setfilterTask] = useState<KeyType>('all');

  let taskTodolist = tasks1;
  if (filterTask === 'active') {
    taskTodolist = tasks1.filter(list => !list.isDone);
  }
  if (filterTask === 'complited') {
    taskTodolist = tasks1.filter(list => list.isDone);
  }

  function changeFilter(changeValue: KeyType) {
    setfilterTask(changeValue);
  }

  function removeTask(id: string) {
    let tasks = tasks1.filter(list => list.id !== id);

    setTasks1(tasks);
  }

  function addTask(newValue: string) {
    let newTask = { id: v1(), title: newValue, isDone: false };

    setTasks1([newTask, ...tasks1]);
  }

  function changeStatus(id: string, isDone: boolean) {
    let task = tasks1.find(list => list.id === id);
    if (task) {
      task.isDone = isDone;
    }

    let copy = [...tasks1];

    setTasks1(copy);
  }

  return (
    <div className="App">
      <Todolist
        title={'What To Learn'}
        tasks={taskTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filterTask={filterTask}
      />
    </div>
  );
}

export default App;
