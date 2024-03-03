import * as React from 'react';

import { Footer, InnerScroll } from '@cellxpert/ui-lib';
import { TabsProps } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import Header from '../../components/Header/Header';
import { useStore } from '../../stores/setupContext';

export interface AccountDetailsProps {
  tabContent: TabsProps['tabs'][0]['content'];
}

export const Content = styled('section')<{ height: number }>(({ height }) => ({
  boxShadow: `0 1px 10px 0px rgba(0,0,0,0.1)`,
  height,
}));

const TabContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
});

const WithFooter: React.FunctionComponent = ({ children }) => {
  return (
    <TabContent>
      {children}
      <Footer />
    </TabContent>
  );
};

export const AccountDetailsPage: React.FunctionComponent<AccountDetailsProps> = ({ tabContent }) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState<number>(0);

  // TODO use useCallback instead of useRef & useEffect (https://medium.com/welldone-software/usecallback-might-be-what-you-meant-by-useref-useeffect-773bc0278ae)

  React.useEffect(() => {
    // const contentRefCall = React.useCallback(
    //   (node) => {
    console.log('FOO', contentRef);

    if (!contentRef || !contentRef.current) {
      console.log('BAR');
      return;
    }

    const { top } = contentRef.current.getBoundingClientRect();
    const newContentHeight = window.innerHeight - top;

    setContentHeight(newContentHeight);
  }, [contentRef]);

  return (
    <div>
      <Header />

      <Content {...{ ref: contentRef, height: contentHeight }}>
        <InnerScroll {...{ medium: true }}>
          <TabContent>
            <WithFooter>{tabContent}</WithFooter>
          </TabContent>
        </InnerScroll>
      </Content>
    </div>
  );
};

const Observed = observer(AccountDetailsPage);

const WithStoreConnection = () => {
  const { accountDetails } = useStore();

  const { getAccountDetails, getAffiliateDocuments, tabContent } = accountDetails;

  React.useEffect(() => {
    (async () => {
      await Promise.all([getAccountDetails(), getAffiliateDocuments()]);
    })();
  }, []);

  return <Observed {...{ tabContent }} />;
};

export default observer(WithStoreConnection);
