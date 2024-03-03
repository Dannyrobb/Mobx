import React from 'react';

import { fixedBlow, flexCenterCenter, Theme } from '@cellxpert/theme';
import { GlobalStyles } from '@cellxpert/ui-lib';
import { WithAllAppWrappers, WithTranslations, WithTranslationsProps } from '@cellxpert/wrappers';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import LoginPage from './pages/login/Login';
import { routes } from './routes';
import { useStore } from './stores/setupContext';
import DashboardPageContainer from './components/DashboardPageContainer/DashboardPageContainer';

interface AppProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  locale: string;
  messages: WithTranslationsProps['messages'];
}

const AppWithWrappers: React.FunctionComponent = ({ children }) => {
  return (
    <React.StrictMode>
      <WithAllAppWrappers>{children}</WithAllAppWrappers>
    </React.StrictMode>
  );
};

export const AppContainer = styled('div')(() => ({}));
export const Loading = styled('div')(() => ({
  ...fixedBlow,
  background: '#c3c3c3CC',
  ...flexCenterCenter,
}));

const App: React.FunctionComponent<AppProps> = ({ locale, messages, isLoading }) => {
  return (
    <WithTranslations {...{ locale, key: locale, messages }}>
      <AppContainer>
        {isLoading && <Loading>Loading</Loading>}
        <Routes>
          <Route
            path={'/'}
            element={
                <DashboardPageContainer />
            }
          >
            {routes.map((route) => {
              return route.subItems ? (
                route.subItems?.map((subRoute) => {
                  return (
                    <Route
                      {...{
                        key: subRoute.key,
                        exact: subRoute.exact,
                        path: `${subRoute.linksTo}`,
                        element: subRoute.component,
                      }}
                    />
                  );
                })
              ) : (
                <Route key={route.key} element={route.component} path={route.linksTo} />
              );
            })}
          </Route>
        </Routes>
      </AppContainer>
    </WithTranslations>
  );
};

const PrivateRoute: React.FunctionComponent = observer(({ children }) => {
  const { auth } = useStore();
  const { isAuthenticated } = auth;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
});

const Observed = observer(App);

const WithStoreConnection = observer(() => {
  const { main, auth, i18n } = useStore();

  const { isLoading } = main;
  const { isAuthenticated } = auth;
  const { locale, messages } = i18n;

  return <Observed {...{ locale, messages, isLoading, isAuthenticated }} />;
});

export default function wrappedApp(): JSX.Element {
  return (
    <AppWithWrappers {...{}}>
      <>
        <WithStoreConnection />
        <GlobalStyles />
      </>
    </AppWithWrappers>
  );
}
