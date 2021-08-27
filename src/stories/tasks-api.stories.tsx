import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { todolistsAPI } from '../api/todolists-api';

export default {
  title: 'API',
};

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': 'e2aa960b-33d4-4875-9d72-648602b61592',
  },
};

const todolistID = '4b362fd7-d359-4358-b7f0-d9a9ba950573';

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const todolistID = '4b362fd7-d359-4358-b7f0-d9a9ba950573';
  useEffect(() => {
    todolistsAPI.getTasks(todolistID).then(res => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const title = 'Hello Sergej';
  useEffect(() => {
    todolistsAPI.createTodolists(title).then(res => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null);
  const todolisID = '4b362fd7-d359-4358-b7f0-d9a9ba950573';
  const taskId = '';
  useEffect(() => {
    todolistsAPI.deleteTasks(todolistID, taskId).then(res => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const title = 'New Title';
  useEffect(() => {
    todolistsAPI.updateTodolist(todolistID, title).then(res => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
