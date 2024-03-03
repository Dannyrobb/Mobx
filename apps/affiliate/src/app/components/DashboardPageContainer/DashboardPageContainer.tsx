import React from 'react';
import styled from '@emotion/styled';
import { MainLayout } from '@cellxpert/ui-lib';
import { MainMenu } from '../MainMenu/MainMenu';
import { routes } from '../../routes';
import PopupsManager from '../../popups/PopupsManager';
import { Outlet } from 'react-router';
import { useStore } from '../../stores/setupContext';
import { observer } from 'mobx-react';

export interface DashboardPageContainerProps {}

export const DashboardPageContainer: React.FunctionComponent<DashboardPageContainerProps> = ({}) => {
  return (
    <MainLayout
      menu={<MainMenu routes={routes} />}
      content={
        <>
          <PopupsManager />
          <Outlet />
        </>
      }
    />
  );
};

const Observed = observer(DashboardPageContainer);

const WithStoreConnection = () => {
  const { main, auth } = useStore();

  const { start } = main;
  const { token } = auth;

  React.useEffect(() => {
    start();
  }, [token]);

  return <Observed />;
};

export default WithStoreConnection;
