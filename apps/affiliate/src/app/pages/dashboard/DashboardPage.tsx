import React from 'react';

import { observer } from 'mobx-react';

import MainStore from '../../stores/MainStore';
import { useStore } from '../../stores/setupContext';
import Dashboard from './Dashboard';
import IbDashboard from './IbDashboard';
import MyPopUpComponent from '../../components/Popup/Popup';
interface DashboardPageProps {
  shouldShowIbDashboard: boolean | null;
  uiConfigByCategory: MainStore['uiConfigByCategory'];
  name: string;
}

const DashboardPage: React.FunctionComponent<DashboardPageProps> = ({
  shouldShowIbDashboard,
  uiConfigByCategory,
  name,
}) => {
  return (
    <>
      {shouldShowIbDashboard && <IbDashboard />}
      {shouldShowIbDashboard === false && <Dashboard />}

      <div>
        <h1>Dashboard</h1>
        <h3>Hello {name},</h3>
        <MyPopUpComponent />
        aaaaaaaaaaaaaaaaaaaaa
        <h2>UI Config By Category</h2>
        {uiConfigByCategory &&
          Object.keys(uiConfigByCategory).map((key) => {
            const item = uiConfigByCategory[key];

            return (
              <React.Fragment>
                <h3>{item[0].category}</h3>
                <ul>
                  {item.map((catItem) => {
                    return <li>{catItem.name}</li>;
                  })}
                </ul>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
};

const Observed = observer(DashboardPage);

const WithStoreConnection = observer(() => {
  const { main, permissions } = useStore();

  const { shouldShowIbDashboard } = permissions;
  const { uiConfigByCategory, name } = main;

  return <Observed {...{ name, uiConfigByCategory, shouldShowIbDashboard }} />;
});

export default WithStoreConnection;
