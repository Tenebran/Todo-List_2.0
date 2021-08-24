import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Task from './Task';
import { Provider } from 'react-redux';
import { store } from '../../state/store/store';
import { ReduxStoreProviderDecorator } from '../../../stories/ReduxStoreProviderDecorator';
import { TaskPrioties, TaskStatuses } from '../../../api/todolists-api';
import { v1 } from 'uuid';

export default {
  title: 'Task Component',
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

const addTaskCallback = action('Add Task');
const changeTaskStatusCallback = action('Status changed');
const changeTaskTitleCallback = action('Title Changed');
const removeTaskCallback = action('Task Removed');

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        task={{
          id: '1',
          title: 'CSS',
          status: TaskStatuses.Completed,
          description: '',
          completed: false,
          priority: TaskPrioties.Low,
          startDate: '',
          deadline: '',
          todoListId: v1(),
          order: 0,
          addedDate: '',
        }}
        id={'5'}
        addTaskAC={addTaskCallback}
        changeTaskStatusAC={changeTaskStatusCallback}
        changeTaskTitleAC={changeTaskTitleCallback}
        removeTaskAC={removeTaskCallback}
      />
      <Task
        task={{
          id: '1',
          title: 'CSS',
          status: TaskStatuses.InProgress,
          description: '',
          completed: false,
          priority: TaskPrioties.Low,
          startDate: '',
          deadline: '',
          todoListId: v1(),
          order: 0,
          addedDate: '',
        }}
        id={'6'}
        addTaskAC={addTaskCallback}
        changeTaskStatusAC={changeTaskStatusCallback}
        changeTaskTitleAC={changeTaskTitleCallback}
        removeTaskAC={removeTaskCallback}
      />
    </>
  );
};
