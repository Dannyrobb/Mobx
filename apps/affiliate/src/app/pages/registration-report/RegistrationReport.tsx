import * as React from 'react';

import { Table, TableControls, Option, Typography, Button, Search } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { RegistrationsReportObj } from '@cellxpert/api-types';
import { useStore } from '../../stores/setupContext';
import { theme } from '@cellxpert/theme';

export interface RegFilterOption extends Option {
  value:
    | ''
    | 'registrationdate'
    | 'fdd'
    | 'qualificationdate'
    | 'commission'
    | 'deposit'
    | 'withdrawal'
    | 'position_count'
    | 'open_positions';
}

export interface RegistrationReportProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  selectedFilter: RegFilterOption;
  setSelectedFilter: (option: RegFilterOption) => void;
  runReport: () => void;
  data: RegistrationsReportObj[];
  columns: Array<{ accessor: string; Header: string; Footer?: () => void }>;
  registrationsReportFilters: RegFilterOption[] | null;
  setUserIdFilter: (value: string) => void;
  userIdFilter: string | undefined;
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

export const RegistrationReport: React.FunctionComponent<RegistrationReportProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setSelectedFilter,
  selectedFilter,
  data,
  columns,
  runReport,
  registrationsReportFilters,
  userIdFilter,
  setUserIdFilter,
}) => {
  const [columnOrder, setColumnOrder] = React.useState<string[]>([]);
  const [hiddenColumns, setHiddenColumns] = React.useState<string[]>([]);

  return (
    <>
      <PageWrapper>
        <HeaderWrap>
          <Typography {...{ variant: 'h5', color: 'main', style: { marginBottom: theme.gutters.base * 6 } }}>
            Registration Report
          </Typography>
          <Search
            {...{
              variant: 'user',
              // label: 'what?',
              placeholder: 'Find User',
              onChange: (event) => {
                setUserIdFilter(event.target.value);
              },
              clearValue: () => {
                setUserIdFilter('');
              },
              value: userIdFilter || '',
            }}
          />
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
            hiddenColumns,
            withAdditionalSelect: registrationsReportFilters ? true : false,
            additionalSelectProps: registrationsReportFilters
              ? {
                  options: registrationsReportFilters,
                  onChange: (opt) => {
                    setSelectedFilter(opt as RegFilterOption);
                  },
                  selected: selectedFilter,
                }
              : null,
            additionalSelectLabel: 'Filter by:',
          }}
        />
        <Table {...{ data, columns, reportName: 'Registration', columnOrder, hiddenColumns }} />
      </PageWrapper>
    </>
  );
};

const Observed = observer(RegistrationReport);

const WithStoreConnection = () => {
  const { registrationsReport } = useStore();

  const {
    registrationsReportParams,
    registrationsData,
    registrationsColumns,
    registrationsReportFilters,
    selectedFilter,
    setStartDate,
    setEndDate,
    setSelectedFilter,
    runReport,
    runInitialReport,
    setUserIdFilter,
  } = registrationsReport;
  React.useEffect(() => {
    runInitialReport();
    runReport();
  }, []);

  return (
    <Observed
      {...{
        startDate: registrationsReportParams.startDate,
        endDate: registrationsReportParams.endDate,
        setStartDate,
        setEndDate,
        setSelectedFilter,
        selectedFilter,
        data: registrationsData,
        columns: registrationsColumns,
        runReport,
        registrationsReportFilters,
        setUserIdFilter,
        userIdFilter: registrationsReportParams.userid,
      }}
    />
  );
};
export default observer(WithStoreConnection);
