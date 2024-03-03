import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import StoreBase from './StoreBase';

import { getEarningsReport } from '../api/api';
import { EarningsFilterOption } from '../pages/earnings-report/EarningsReport';
import { format, startOfMonth } from 'date-fns';

import {
  GetEarningsReportParams,
  GetEarningsReportResponse,
  EarningsReportObj,
} from '@cellxpert/api-types';

const allEarningsFilters: EarningsFilterOption[] = [
  { key: 'All', label: 'All', value: 'All' },
  { key: 'CPA', label: 'CPA', value: 'CPA' },
  { key: 'CPAA', label: 'CPAA', value: 'CPAA' },
  { key: 'CPL', label: 'CPL', value: 'CPL' },
  { key: 'Revshare', label: 'Revshare', value: 'Revshare' },
  { key: 'Sub_Affiliate', label: 'Sub Affiliate', value: 'Sub Affiliate' },
  { key: 'Bonus', label: 'Bonus', value: 'Bonus' }
]

class EarningsReportStore extends StoreBase {
  public earningsReportResponse: GetEarningsReportResponse | null = null;
  public earningsReportFilters: EarningsFilterOption[] | null = allEarningsFilters;
  public selectedFilter: EarningsFilterOption = {
    label: 'All',
    key: 'All',
    value: 'All',
  };
  public earningsReportParams: GetEarningsReportParams = {
    startDate: format(startOfMonth(new Date()), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
  };

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      earningsReportResponse: observable,
      earningsReportParams: observable,
      earningsReportFilters: observable,
      selectedFilter: observable,
      // Computed -
      earningsData: computed,
      earningsColumns: computed,
      //Actions
      setStartDate: action,
      setEndDate: action,
      setSelectedFilter: action,
      // XHR Actions
      runReport: action,
      runInitialReport: action,
    });
  }

  public runReport = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);

      const { data } = await getEarningsReport(this.earningsReportParams);
      runInAction(() => {
        this.earningsReportResponse = data;
      });
    } catch (error) {
      console.log(error);
    }
    this.rootStore.main.setLoading(false);
  };

  public runInitialReport = async (): Promise<void> => {
    try {
      const { data } = await getEarningsReport({
        endDate: this.earningsReportParams.endDate,
        startDate: this.earningsReportParams.startDate
      });
    } catch (error) {
      console.log(error);
    }
  };

  public setStartDate = (date: string | null): void => {
    this.earningsReportParams.startDate = date;
  };

  public setEndDate = (date: string | null): void => {
    this.earningsReportParams.endDate = date;
  };

  public setSelectedFilter = (option: EarningsFilterOption): void => {
    this.selectedFilter = option;
    this.earningsReportParams['filter-earningType'] = option.value;
  };

  get earningsData(): EarningsReportObj[] {
    const data = this?.earningsReportResponse?.Earnings.length
      ? this.earningsReportResponse.Earnings
      : [];
    return data;
  }

  get earningsColumns(): Array<{ accessor: string; Header: string }> {
    const columns = this?.earningsReportResponse?.Earnings?.length
      ? Object.keys(this.earningsReportResponse.Earnings[0]).map((key) =>
          !key.includes('Date') && !this.rootStore.main.nonSumColumns.includes(key)
            ? {
                accessor: key,
                Header: key,
                footerParams: { format: 'sum' },
              }
            : { accessor: key, Header: key }
        )
      : [];
    return columns;
  }
}

export default EarningsReportStore;