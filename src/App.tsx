import React from 'react';
import Todolist from './Todolist/Todolist';

import './App.css';

let tasks1 = [
  { id: 1, title: 'CSS', isDone: true },
  { id: 2, title: 'JS', isDone: true },
  { id: 3, title: 'React', isDone: false },
];
let tasks2 = [
  { id: 1, title: 'Terminator', isDone: true },
  { id: 2, title: 'XXX', isDone: true },
  { id: 3, title: 'MArvel', isDone: false },
];

function App() {
  return (
    <div className="App">
      <Todolist title={'What To Learn'} tasks={tasks1} />
      <Todolist title={'Movies'} tasks={tasks2} />
    </div>
  );
}

export default App;
