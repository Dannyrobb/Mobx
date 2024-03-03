import React from 'react';

import { observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';

import { UserPass } from '@cellxpert/api-types';
import Login from '../../components/Login/Login';
import { useStore } from '../../stores/setupContext';

export interface LoginPageProps {
  login: (payload: UserPass) => void;
  isAuthenticated: boolean;
}

export const LoginPage: React.FunctionComponent<LoginPageProps> = ({ login, isAuthenticated }) => {
  console.log({ isAuthenticated });
  return <div>{isAuthenticated ? <Navigate {...{ to: { pathname: '/' } }} /> : <Login {...{ login }} />}</div>;
};

const Observed = observer(LoginPage);

const WithStoreConnection = () => {
  const { auth } = useStore();
  const { login, isAuthenticated } = auth;

  return <Observed {...{ login, isAuthenticated }} />;
};

export default observer(WithStoreConnection);
