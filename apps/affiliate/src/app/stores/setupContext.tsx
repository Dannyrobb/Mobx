import React from 'react';

import { createStore, Stores } from './createStore';

export const store = createStore() as Stores;

let storeContext = React.createContext(store);

export const StoreProvider: React.FunctionComponent<{ externalStores?: Stores }> = ({ externalStores, children }) => {
  storeContext = React.createContext(externalStores || store);

  return <storeContext.Provider value={externalStores || store}>{children}</storeContext.Provider>;
};

export const useStore = (): Stores => {
  const _store = React.useContext(storeContext);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.alex = _store;
  if (!_store) {
    throw new Error('You have forgotten to use StoreProvider, go fish');
  }
  return _store;
};
