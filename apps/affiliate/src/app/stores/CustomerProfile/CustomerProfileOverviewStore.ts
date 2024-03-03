import { action, computed, makeObservable, observable } from 'mobx';

import { getActivityReport, getRegistrationsReport } from '../../api/api';
import { GetActivityReportResponse, GetRegistrationsReportResponse } from '@cellxpert/api-types';
import {
  CustomerActivityKey,
  CustomerActivityProps,
} from '../../pages/customer-profile/components/CustomerActivity/CustomerActivity';
import { CustomerCommissionProps } from '../../pages/customer-profile/components/CustomerCommission/CustomerCommission';
import {
  CustomerIdentityProps,
  CustomerProfileInfoKey,
} from '../../pages/customer-profile/components/CustomerIdentity/CustomerIdentity';
import { CustomerSymbolsProps, TabKey } from '../../pages/customer-profile/components/CustomerSymbols/CustomerSymbols';
import { CustomerTransactionsProps } from '../../pages/customer-profile/components/CustomerTransactions/CustomerTransactions';
import StoreBase from '../StoreBase';

export interface KeyValueItem {
  key: string;
  value: string | undefined;
}

class CustomerProfileOverviewStore extends StoreBase {
  public customerProfileOverviewResponse: GetRegistrationsReportResponse | null = null;

  public customerActivityReportResponse: GetActivityReportResponse | null = null;

  public activeChartTabId: TabKey = 'volume';

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      activeChartTabId: observable,

      customerProfileOverviewResponse: observable,
      customerActivityReportResponse: observable,
      // Computed -
      customerActivityData: computed,
      volumeSymbolAndCountData: computed,
      customerIdentityData: computed,
      customerCommissionData: computed,
      customerTransactionsData: computed,
      //Actions
      setActiveChartTabId: action,
      // XHR Actions
      getRegistrationsReport: action,
      getActivityReport: action,
    });
  }

  setActiveChartTabId = (tabId: TabKey): void => {
    this.activeChartTabId = tabId;
  };

  get customerIdentityData(): CustomerIdentityProps['data'] {
    const data = this.customerProfileOverviewResponse?.Registrations[0];
    if (!this.customerProfileOverviewResponse || !data) {
      return [];
    }

    return [
      { key: 'Customer ID', value: data.User_ID },
      ...(data.Status !== undefined ? [{ key: 'Status' as CustomerProfileInfoKey, value: data.Status ?? '' }] : []),
      ...(data.Country !== undefined ? [{ key: 'Country' as CustomerProfileInfoKey, value: data.Country ?? '' }] : []),
      ...(data.generic1 !== undefined
        ? [{ key: 'Refferal URL' as CustomerProfileInfoKey, value: data.generic1 ?? '' }]
        : []),

      { key: 'Refferal URL', value: data.generic1 ?? '' },
      // { key: 'Device', value: data.generic1 ?? '' },
      // { key: 'Age', value: data.generic1 ?? '' },
      {
        key: 'Registration date',
        value: data.Registration_Date.slice(0, 10).toString(),
      },
    ];
  }
  get customerCommissionData(): CustomerCommissionProps['data'] {
    const data = this.customerProfileOverviewResponse?.Registrations[0];
    if (!this.customerProfileOverviewResponse || !data || !data.Commission) {
      return null;
    }
    return { key: 'Commission', value: `$${data?.Commission.toFixed(2)}` };
  }

  get chartData(): CustomerSymbolsProps['chartData'] | null {
    const chartKey: TabKey = this.activeChartTabId;
    if (!this.volumeSymbolAndCountData) {
      return null;
    }

    const data = getSortedVolumeAndCountData(chartKey, this.volumeSymbolAndCountData);

    // TODO - do it in one go -
    const labels = data.top.map((item) => item.symbol);
    const chartValues = data.top.map((item) => item.value);

    return {
      labels,
      datasets: [
        {
          data: chartValues,
          // backgroundColor: ['#2d7aff', '#ffce32', '#78e4ff', '#8871f9', '#fb8e5f'],
          // borderWidth: 1,
          // hoverOffset: 12,
          // hoverBorderWidth: 5,
          // hoverBorderColor: [
          //   'rgb(45, 122, 255, 0.5)',
          //   'rgb(255, 206, 50, 0.5)',
          //   'rgb(120, 228, 255, 0.5)',
          //   'rgb(136, 113, 249, 0.5)',
          //   'rgb(251, 142, 95, 0.5)',
          // ],
        },
      ],
    };
  }

  get customerTransactionsData(): CustomerTransactionsProps['data'] {
    const data = this.customerProfileOverviewResponse?.Registrations[0];
    if (
      !this.customerProfileOverviewResponse ||
      !data ||
      !data.First_Deposit_Date ||
      !data.Deposits ||
      !data.Net_Deposits
    ) {
      return [];
    }
    return [
      { key: 'First deposit', value: data.First_Deposit ?? '' },
      { key: 'Deposit date', value: data.First_Deposit_Date.slice(0, 10).toString() },
      { key: 'Deposit count', value: data.Deposit_Count ?? '' },
      { key: 'Total deposit', value: parseFloat(data.Deposits.toString()).toFixed(2) },
      { key: 'Total withdrawals', value: data.Withdrawals },
      { key: 'Net deposit', value: `$${parseFloat(data?.Net_Deposits.toString()).toFixed(2)}` },
    ];
  }

  get customerActivityData(): CustomerActivityProps['data'] {
    const data = this.customerProfileOverviewResponse?.Registrations[0];
    if (!this.customerProfileOverviewResponse || !data) {
      return [];
    }

    return [
      // { key: 'Activity count', value: 654 }, //Not in the GRRR?
      { key: 'Volume', value: data.Volume },
      { key: 'PL', value: typeof data.PL !== 'undefined' ? parseFloat(data.PL.toString()).toFixed(2) : undefined },
      // ...(data.PL !== undefined ? [{ key: 'PL' as CustomerActivityKey, value: data.PL.toFixed(2) }] : []),
      ...(data.Net_PL !== undefined ? [{ key: 'Net PL' as CustomerActivityKey, value: data.Net_PL.toFixed(2) }] : []),
      ...(data.Lot_Amount !== undefined ? [{ key: 'LOT' as CustomerActivityKey, value: data.Lot_Amount }] : []),
      ...(data.Spread !== undefined ? [{ key: 'Spread' as CustomerActivityKey, value: data.Spread }] : []),
      // { key: 'ROI', value: 2.06 }, //Not in the GRRR?
      // ...(data.Brokerage_Fee !== undefined
      //   ? [{ key: 'Brokerage fee' as CustomerActivityKey, value: data.Brokerage_Fee }]
      //   : []),
      { key: 'Markup', value: 69.25 }, //Not in the GRRR?
    ];
  }

  get volumeSymbolAndCountData(): Array<{
    count: number;
    volume: number;
    symbol: string;
  }> | null {
    return formatChartData(this.customerActivityReportResponse);
  }

  public getRegistrationsReport = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(false);
      const { data } = await getRegistrationsReport({
        startDate: 'invalid',
        endDate: 'invalid',
        userid: '6option-38402717',
        TrackingCode: true,
        afp: true,
      });
      console.log(data);
      this.customerProfileOverviewResponse = data;
    } catch (error) {
      console.error('error', error);
      this.rootStore.main.setLoading(false);
    }
  };

  public getActivityReport = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(false);
      const { data } = await getActivityReport({
        startdate: '01/01/2015',
        enddate: '01/01/2021',
        activitytype: 'close',
        // xml: 1,
      });
      this.customerActivityReportResponse = data;
    } catch (error) {
      console.log('Activity Report error is: ', error);
      this.rootStore.main.setLoading(false);
    }
  };
}

export const formatChartData = (
  data: GetActivityReportResponse | null
): Array<{
  count: number;
  volume: number;
  symbol: string;
}> | null => {
  if (!data) {
    return null;
  }

  return data.map((item) => {
    return { volume: item.Volume, symbol: item.Symbol ?? 'No Symbol', count: item.Count };
  });
};

export const getSortedVolumeAndCountData = (
  key: 'volume' | 'count',
  data: Array<{
    count: number;
    volume: number;
    symbol: string;
  }>
): {
  top: Array<{
    value: number;
    symbol: string;
  }>;
  total: number;
} => {
  ///Ordered highest to the lowest, regardless of the key (volume or count)
  const sorted = data.sort((a, b) => {
    return b[key] - a[key];
  });

  //Checks if there are more than 4 values
  const moreThanFour = sorted.length > 4;

  //Groups the sorted 4 highest to a variable with their respective value (value of the passed key) and symbol
  const topFour = sorted.slice(0, 4).map((item) => ({
    value: item[key],
    symbol: item.symbol,
  }));

  //If less than 4 just return the 4 highest, else return the 4 highest and sum the rest and symbol it as "Other"
  const output = {
    top: !moreThanFour
      ? topFour
      : [
          ...topFour,
          {
            value: sorted.slice(4).reduce((acc, item) => {
              return acc + item[key];
            }, 0),
            symbol: 'Other',
          },
        ],
    total: sorted.reduce((acc, item) => {
      return acc + item[key];
    }, 0),
  };
  return output;
};

export default CustomerProfileOverviewStore;
