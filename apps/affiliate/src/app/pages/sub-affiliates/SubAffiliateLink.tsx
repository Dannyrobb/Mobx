import * as React from 'react';

import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/setupContext';
import { Typography, CopyClipboard } from '@cellxpert/ui-lib';

export interface SubAffiliateLinkProps {
  subAffiliateLink?: string;
}

export const Header = styled('header')(({ theme }) => ({
  padding: `${theme.gutters.base * 4}px ${theme.gutters.base * 4}px ${theme.gutters.base * 3}px`,
  backgroundColor: theme.palette.blacks.background,
  '& h1': {
    marginBottom: `${theme.gutters.base * 6}px`,
  },
}));

export const Container = styled('div')(({}) => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const PageContent = styled('div')(() => ({
  justifyContent: 'center',
}));

export const SubAffiliateLink: React.FunctionComponent<SubAffiliateLinkProps> = ({ subAffiliateLink }) => {
  return (
    <>
      <Container>
        <Header>
          <Typography {...{ variant: 'h5', color: 'main', style: { marginBottom: theme.gutters.base * 6 } }}>
            Sub affiliate link
          </Typography>
        </Header>
        <PageContent>
          <h3>Copy and share your sub affiliate link.</h3>
          <p> View your registered sub affiliates and the commissions generated by them in the sub affiliate report.</p>
          <CopyClipboard value={subAffiliateLink as string}></CopyClipboard>
        </PageContent>
      </Container>
    </>
  );
};
const Observed = observer(SubAffiliateLink);

const WithStoreConnection = () => {
  const { subAffiliate } = useStore();
  const { subAffiliateLink } = subAffiliate;

  if (!subAffiliateLink) {
    return null;
  }

  return <Observed {...{ subAffiliateLink }} />;
};
export default observer(WithStoreConnection);