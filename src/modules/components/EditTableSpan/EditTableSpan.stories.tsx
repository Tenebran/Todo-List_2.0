import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import EditTableSpan from './EditTableSpan';

export default {
  title: 'EditTableSpan Component',
  component: EditTableSpan,
} as ComponentMeta<typeof EditTableSpan>;

const changeCallback = action('Title changed');

export const EditTableSpanBaseExample = () => {
  return <EditTableSpan title={'Start Title'} onChange={changeCallback} />;
};
