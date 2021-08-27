import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../modules/state/store/store';

export const ReduxStoreProviderDecorator = (story: any) => {
  return <Provider store={store}>{story()}</Provider>;
};
