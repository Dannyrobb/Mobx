import React, { useEffect } from 'react';

import { theme, Theme } from '@cellxpert/theme';
import { Footer, Typography } from '@cellxpert/ui-lib';
import { Tabs, TabsProps } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { useStore } from '../../stores/setupContext';
import { useParams } from 'react-router';

// const params = useParams();
export interface CustomerProfileProps {
  setActiveTab: (tabKey: string) => void;
  setUserId: (userId: string) => void;
  tabs: TabsProps['tabs'];
  tabContent: TabsProps['tabs'][0]['content'];
}

const CustomerProfileWrapper = styled('div')(() => ({
  height: '100vh',
  flexDirection: 'column',
  display: 'flex',
  backgroundColor: theme.palette.blacks.background,
}));

const CustomerProfileHeaderWrapper = styled('section')(() => ({
  boxShadow: ' inset 0px -2px 0px 0px #E6E7E8',
  padding: `${theme.gutters.base * 4}px ${theme.gutters.base * 4}px 0  ${theme.gutters.base * 4}px`,
  gap: 60,
}));

const Content = styled('section')(() => ({
  flexGrow: 1,
  marginBottom: 1,
}));

export const CustomerProfile: React.FunctionComponent<CustomerProfileProps> = ({
  tabs,
  setActiveTab,
  setUserId,
  tabContent,
}) => {
  const params = useParams<{ customerId: string | undefined }>();
  useEffect(() => {
    setUserId(params && params.customerId ? params?.customerId : '');
  });
  return (
    <CustomerProfileWrapper>
      <CustomerProfileHeaderWrapper>
        <Typography {...{ variant: 'h5', color: 'main', style: { marginBottom: theme.gutters.base * 6 } }}>
          Header Part
        </Typography>
        <Tabs
          {...{
            onChange: setActiveTab,
            tabs,
            position: 'left',
          }}
        />
      </CustomerProfileHeaderWrapper>
      <Content>{tabContent}</Content>
      <Footer />
    </CustomerProfileWrapper>
  );
};

const Observed = observer(CustomerProfile);

const WithStoreConnection = () => {
  const { customerProfile } = useStore();

  const { tabs, setActiveTab, setUserId, tabContent } = customerProfile;

  return <Observed {...{ tabs, setActiveTab, setUserId, tabContent }} />;
};

export default observer(WithStoreConnection);
