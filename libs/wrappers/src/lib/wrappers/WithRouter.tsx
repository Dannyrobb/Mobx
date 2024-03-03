import React from 'react';

import { MemoryRouter, BrowserRouter } from 'react-router-dom';

export const WithRouterForTesting: React.FunctionComponent = ({ children }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

export const WithRouterForApp: React.FunctionComponent = ({ children }) => {
  return <BrowserRouter {...{}}>{children}</BrowserRouter>;
};
