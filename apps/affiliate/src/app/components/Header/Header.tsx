import React from 'react';

import { Theme } from '@cellxpert/theme';
import { Tabs, TabsProps } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import { UserInfo } from './UserInfo';

import { useStore } from '../../stores/setupContext';
import { PageTitle } from '../PageTitle/PageTitle';

export interface HeaderProps {
  name: string;
  affiliateId: string | number;
  setActiveTab: (tabKey: string) => void;
  tabs: TabsProps['tabs'];
}

const HeaderSection = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.blacks.background,
  padding: `${theme.gutters.base * 4}px ${theme.gutters.base * 4}px 0`,
}));

export const Header: React.FunctionComponent<HeaderProps> = ({ affiliateId, tabs, name, setActiveTab }) => {
  return (
    <HeaderSection>
      <PageTitle {...{ style: { marginBottom: 0 } }}>
        <FormattedMessage
          {...{
            id: 'sidebar.nav.account_details',
            default: 'My Account Details',
            description: 'Title of account details page',
          }}
        />
      </PageTitle>
      <UserInfo {...{ name, affiliateId }} />
      <Tabs
        {...{
          onChange: setActiveTab,
          tabs,
        }}
      />
    </HeaderSection>
  );
};

const Observed = observer(Header);

const WithStoreConnection = () => {
  const { accountDetails, main } = useStore();

  const { activeTabKey, setActiveTab, tabs } = accountDetails;
  const { name } = main;
  // TODO - Connect to a real ID from data coming from the backend.
  const affiliateId = '234';

  return <Observed {...{ affiliateId, tabs, activeTabKey, setActiveTab, name, pageTitle: 'My account details' }} />;
};

export default observer(WithStoreConnection);
