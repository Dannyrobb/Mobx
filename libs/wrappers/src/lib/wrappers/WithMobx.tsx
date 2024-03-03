import React from 'react';

// import { StoreProvider } from './../stores/setupContext';

export const WithMobx: React.FunctionComponent = ({ children }) => {
  return <>{children}</>;
  // return <StoreProvider>{React.Children.only(children)}</StoreProvider>;
};
