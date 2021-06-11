import React, { useState } from 'react';
import Todolist, { TasksType } from './components/modules/Todolist/Todolist';

import './App.css';

export type KeyType = 'all' | 'complited' | 'active';

function App() {
  let [tasks1, setTasks1] = useState<Array<TasksType>>([
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
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

  function removeTask(id: number) {
    let tasks = tasks1.filter(list => list.id !== id);

    setTasks1(tasks);
  }

  return (
    <div className="App">
      <Todolist
        title={'What To Learn'}
        tasks={taskTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
