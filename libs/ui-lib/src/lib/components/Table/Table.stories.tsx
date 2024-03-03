import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Table, TableProps } from './Table';

import { CellProps } from 'react-table';

import mockData from './mock.json';
import { sumTotal } from './TableFunctions';

interface GetRegistrationsReportResponse {
  Registrations: Array<{
    Adjustments?: number | null;
    Admin_Fee?: number | null;
    Bonus?: number | null;
    Brand?: string;
    Brokerage_Fee?: number | null;
    Commission?: number | null;
    Commission_Count?: number | null;
    Conversion_Days?: number | null;
    Country?: string | null;
    Customer_Name?: string | null;
    Deposit_Count?: number | null;
    Deposits?: number | null;
    External_FTD_Date?: string | null;
    First_Deposit?: number | null;
    First_Deposit_Date?: string | null;
    GGR?: number | null;
    Jackpot_Contribution?: number | null;
    Language?: string;
    Last_Open_Position_Date?: null;
    Lot_Amount?: number;
    Name?: string;
    NCI?: number;
    Net_Deposits?: number;
    Net_PL?: number;
    Open_Positions?: null;
    PL?: number;
    Position_Count?: number;
    Qualification_Date?: string;
    Registration_Date: string;
    Size?: string;
    Spread?: number;
    Status?: string;
    Tax?: number;
    Total_Bonus?: number;
    Tracking_Code?: string;
    Type?: string;
    User_ID: string;
    Volume?: number;
    Withdrawals?: number;
    afp?: string | null;
    generic1?: string | null;
    generic2?: string | null;
    generic3?: string | null;
  }>;
}

export default {
  title: 'UI Lib / Table',
  component: Table,
  argTypes: {},
} as Meta;

const data = mockData as Array<DataItem>;

const columns = [
  {
    accessor: 'User_ID',
    Header: 'USER',
    // Cell: (props: CellProps<DataItem>) => {
    //   return <a>{props?.cell?.value}</a>;
    // },
  },
  {
    accessor: 'Registration_Date',
    Header: 'Registration_Date',
  },
  { accessor: 'afp', Header: 'afp' },
  { accessor: 'Status', Header: 'Status' },
  { accessor: 'Qualification_Date', Header: 'Qualification_Date' },
  { accessor: 'Country', Header: 'Country' },
  {
    accessor: 'Position_Count',
    Header: 'Position_Count',
    // Footer: (info: any) => {
    //   return sumTotal(info);
    // },
  },
  { accessor: 'PL', Header: 'PL' },
  { accessor: 'Net_PL', Header: 'Net_PL' },
  { accessor: 'Lot_Amount', Header: 'Lot_Amount' },
  { accessor: 'Volume', Header: 'Volume' },
  { accessor: 'Spread', Header: 'Spread' },
  { accessor: 'Brokerage_Fee', Header: 'Brokerage_Fee' },
  { accessor: 'First_Deposit', Header: 'First_Deposit' },
  { accessor: 'First_Deposit_Date', Header: 'First_Deposit_Date' },
  { accessor: 'External_FTD_Date', Header: 'External_FTD_Date' },
  { accessor: 'Deposits', Header: 'Deposits' },
  { accessor: 'Withdrawals', Header: 'Withdrawals' },
  { accessor: 'Net_Deposits', Header: 'Net_Deposits' },
  { accessor: 'Deposit_Count', Header: 'Deposit_Count' },
  { accessor: 'Commission_Count', Header: 'Commission_Count' },
  { accessor: 'generic1', Header: 'AAA' },
  { accessor: 'generic3', Header: 'AAA' },
  { accessor: 'Customer_Name', Header: 'Customer_Name' },
  { accessor: 'Open_Positions', Header: 'Open_Positions' },
  { accessor: 'Last_Open_Position_Date', Header: 'Last_Open_Position_Date' },
  { accessor: 'Commission', Header: 'Commission' },
  { accessor: 'GGR', Header: 'GGR' },
  { accessor: 'Admin_Fee', Header: 'Admin_Fee' },
  { accessor: 'Tax', Header: 'Tax' },
  { accessor: 'Adjustments', Header: 'Adjustments' },
  { accessor: 'Jackpot_Contribution', Header: 'Jackpot_Contribution' },
  { accessor: 'Bonus', Header: 'Bonus' },
];

type DataItem = GetRegistrationsReportResponse['Registrations'][0];

function filterOutHiddenColumns() {
  return ['GGR'];
}

const All: Story<TableProps<DataItem>> = (args) => {
  return (
    <div {...{ style: { width: '100%', gap: 16, overflow: 'hidden' } }}>
      <Table
        {...{
          columns: columns,
          data,
          hiddenColumns: ['Registration_Date'],
          columnOrder: ['User_ID', 'Status', 'afp'],
          reportName: 'commissions',
          withFilters: true,
        }}
      />
    </div>
  );
};

export const all = All.bind({});
all.args = {};
