import * as React from 'react';

import { Table, TableControls, Option, Typography, Button, Search } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { SubAffiliateReportObj } from '@cellxpert/api-types';
import { useStore } from '../../stores/setupContext';
import { theme } from '@cellxpert/theme';

export interface SubAffiliateReportProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  runReport: () => void;
  data: SubAffiliateReportObj[];
  columns: Array<{ accessor: string; Header: string; Footer?: () => void }>;
}

const PageWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.blacks.background,
}));

const HeaderWrap = styled('div')(({ theme }) => ({
  padding: `${theme.gutters.base * 4}px ${theme.gutters.base * 4}px 0  ${theme.gutters.base * 4}px`,
  display: 'flex',
  justifyContent: 'space-between',
}));

export const SubAffiliateReport: React.FunctionComponent<SubAffiliateReportProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  data,
  columns,
  runReport,
}) => {
  const [columnOrder, setColumnOrder] = React.useState<string[]>([]);
  const [hiddenColumns, setHiddenColumns] = React.useState<string[]>([]);

  return (
    <>
      <PageWrapper>
        <HeaderWrap>
          <Typography {...{ variant: 'h5', color: 'main', style: { marginBottom: theme.gutters.base * 6 } }}>
            Sub Affiliate Report
          </Typography>
        </HeaderWrap>
        <TableControls
          {...{
            startDate,
            endDate,
            setStartDate,
            setEndDate,
            columns,
            runReport,
            onOrderChange: (order: string[]) => {
              setColumnOrder(order);
            },
            columnOrder,
            onColumnToggle: (option) => {
              hiddenColumns.some((opt) => opt === option.value)
                ? setHiddenColumns(hiddenColumns.filter((item) => item !== option.value))
                : setHiddenColumns([...hiddenColumns, option.value]);
            },
            additionalSelectLabel: 'Filter by:',
          }}
        />
        <Table {...{ data, columns, reportName: 'Sub Affiliates', columnOrder, hiddenColumns }} />
      </PageWrapper>
    </>
  );
};

const Observed = observer(SubAffiliateReport);

const WithStoreConnection = () => {
  const { subAffiliate } = useStore();

  const {
    subAffiliateReportParams,
    subAffiliateData,
    subAffiliateReportColumns,
    setStartDate,
    setEndDate,
    runReport,
    runInitialReport,
  } = subAffiliate;
  React.useEffect(() => {
    runInitialReport();
    runReport();
  }, []);

  return (
    <Observed
      {...{
        startDate: subAffiliateReportParams.startDate,
        endDate: subAffiliateReportParams.endDate,
        setStartDate,
        setEndDate,
        data: subAffiliateData,
        columns: subAffiliateReportColumns,
        runReport,
      }}
    />
  );
};
export default observer(WithStoreConnection);