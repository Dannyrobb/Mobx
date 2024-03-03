import * as React from 'react';

import { theme, Theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import { Button, Card, CopyClipboard, DatePicker, PredefinedDatePicker, Select, Typography } from '@cellxpert/ui-lib';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { IdentificationIcon } from '@cellxpert/icons';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/setupContext';
import { GetAvailableBrandsObj, MediaReportObj } from '@cellxpert/api-types';
import LargeDatasetWithPercent from '../../components/IbDashboard/LargeDatasetWithPercent/LargeDatasetWithPercent';

export interface IbDashboardProps {
  comparedData: Record<keyof MediaReportObj, string> | {};
  brands: GetAvailableBrandsObj[] | null;
  runReport: () => void;
}

const PageWrapper = styled('div')(({ theme }) => ({
  padding: theme.gutters.base * 4,
}));

const PageControls = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const CardsContainer = styled('div')(({}) => ({
  ...theme.typography.meta.body2,
  display: 'grid',
  gridTemplateColumns: '5fr 5fr 6fr',
  gap: 32,
}));

const GreyTitle = styled('div')<{ marginBottom?: number }>(({ marginBottom }) => ({
  color: theme.palette.additional.grey[700],
  ...(marginBottom && { marginBottom: marginBottom }),
}));

export const IbDashboard: React.FunctionComponent<IbDashboardProps> = ({ comparedData, brands, runReport }) => {
  return (
    <PageWrapper>
      <PageTitle>
        IB Dashboard
        <Button
          {...{
            label: 'Contact Your Manager',
            icon: <IdentificationIcon />,
            variant: 'secondary',
            onClick: () => {
              // TODO - Open a modal to contact your manager
            },
          }}
        />
      </PageTitle>
      <PageControls>
        <PredefinedDatePicker
          {...{
            onChange: (startDate: string, endDate: string, key: string) => {
              console.log(startDate, endDate, key);
            },
          }}
        />
        <DatePicker
          {...{
            variant: 'left',
            onChange: (date) => {
              console.log(date);
            },
          }}
        />
        <DatePicker
          {...{
            variant: 'right',
            onChange: (date) => {
              console.log(date);
            },
          }}
        />
        <Button
          {...{
            label: 'Update',
            onClick: () => {
              runReport();
            },
          }}
        />
        {brands && (
          <div>
            <Select
              {...{
                placeholder: 'Select Brand',
                options: brands.map((brand) => ({ key: brand.identifier, value: brand.identifier, label: brand.name })),
                onChange: (option) => {
                  console.log('Selected option', option);
                },
              }}
            />
            <CopyClipboard {...{ value: '', readOnly: true }} />
          </div>
        )}
      </PageControls>
      <CardsContainer>
        <Card>
          <GreyTitle {...{ marginBottom: 16 }}>Commissions</GreyTitle>
          <LargeDatasetWithPercent {...{ value: 123, change: '+2', isCurrency: true }} />
        </Card>
        <Card>B</Card>
        <Card>C</Card>
      </CardsContainer>
      {JSON.stringify(comparedData)}
    </PageWrapper>
  );
};

const Observed = observer(IbDashboard);

const WithStoreConnection = observer(() => {
  const { ibDashboard } = useStore();

  const { comparedData, runReport, brands } = ibDashboard;

  React.useEffect(() => {
    runReport();
  }, []);

  return <Observed {...{ runReport, comparedData, brands }} />;
});

export default WithStoreConnection;
