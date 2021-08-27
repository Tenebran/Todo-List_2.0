import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddItemForm from './AddItemForm';

export default {
  title: 'AddItemForm Component',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const callback = action('Butttom  add was pressed inside the form');

export const AddItemFormBaseExample = (props: any) => {
  return <AddItemForm addItem={callback} />;
};
