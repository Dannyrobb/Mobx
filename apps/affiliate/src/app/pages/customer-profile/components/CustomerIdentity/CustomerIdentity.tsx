import React from 'react';

import { CustomerIdentityIcon } from '@cellxpert/icons';
import { theme, Theme } from '@cellxpert/theme';
import { InnerScroll } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { FormattedDate } from 'react-intl';

import { useStore } from '../../../../stores/setupContext';

export interface CustomerIdentityProps {
  data: Array<{ key: CustomerProfileInfoKey; value: string | number | undefined }>;
}

export type CustomerProfileInfoKey =
  | 'Customer ID'
  | 'Status'
  | 'Age'
  | 'Refferal URL'
  | 'Device'
  | 'Country'
  | 'Registration date';

const Container = styled('div')(({ theme }) => ({
  minWidth: theme.gutters.base * 40,
  height: '100%',
  boxShadow: `2px 0 3px -2px rgba(0, 0, 0, 0.2)`,
  backgroundColor: theme.palette.blacks.white,
}));

const CustomerIdentityWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: `${theme.gutters.base * 4.125}px ${theme.gutters.base * 4}px`,
}));

const CustomerIdentityHeader = styled('div')(({ theme }) => ({
  ...theme.typography.meta.subtitle1,
  display: 'flex',
  gap: 8,
  marginBottom: theme.gutters.base * 3,
}));
const CustomerIdentityField = styled('div')(({ theme }) => ({
  ...theme.typography.meta.caption,
  color: theme.palette.text.label,
  marginBottom: theme.gutters.base * 3 - 2,
}));

const CustomerFieldValue = styled('div')(() => ({
  ...theme.typography.meta.body2,
  color: theme.palette.text.main,
  minHeight: 20,
  paddingTop: 2,
}));

export const CustomerIdentity: React.FunctionComponent<CustomerIdentityProps> = ({ data }) => {
  return (
    <Container>
      <InnerScroll {...{ small: true, style: { height: 'fit-content' } }}>
        <CustomerIdentityWrapper>
          <CustomerIdentityHeader>
            <CustomerIdentityIcon {...{ width: 20, height: 20, color: 'main' }} />
            Customer identity
          </CustomerIdentityHeader>

          {data.map((item) => (
            <CustomerIdentityField>
              {item.key}

              <CustomerFieldValue>
                {item.key === 'Registration date' ? (
                  <FormattedDate value={item.value} year={'numeric'} month={'2-digit'} day={'2-digit'} />
                ) : (
                  item.value
                )}
              </CustomerFieldValue>
            </CustomerIdentityField>
          ))}
        </CustomerIdentityWrapper>
      </InnerScroll>
    </Container>
  );
};

const Observed = observer(CustomerIdentity);

const WithStoreConnection = observer(() => {
  const { customerProfileOverview } = useStore();

  const { customerIdentityData } = customerProfileOverview;

  return <Observed {...{ data: customerIdentityData }} />;
});

export default WithStoreConnection;
