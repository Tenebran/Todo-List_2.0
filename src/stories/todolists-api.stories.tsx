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

const todolistID = '7821570e-c2f6-42b0-8aed-ff42d559efc1';

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistsAPI.getTodolists().then(res => {
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
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const todolisID = 'b4c6442d-2861-4547-b975-c9c4c4465e30';
  useEffect(() => {
    todolistsAPI.deleteTodoList(todolisID).then(res => {
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
