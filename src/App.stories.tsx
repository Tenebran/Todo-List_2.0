import React from 'react';
import { ComponentMeta } from '@storybook/react';
import App from './App';

import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator';

export default {
  title: 'App Component',
  component: App,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

export const AppBaseExample = (props: any) => {
  return <App />;
};
