import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import StoreBase from './StoreBase';

import { getLeadsReport } from '../api/api';
import { format, startOfMonth } from 'date-fns';

import {
  GetLeadsReportParams,
  GetLeadsReportResponse,
} from '@cellxpert/api-types';

class LeadsReportStore extends StoreBase {
  public leadsReportResponse: GetLeadsReportResponse | null = null;
  public leadsReportParams: GetLeadsReportParams = {
    Brand: true,
    Language: true,
    Name: true,
    Size: true,
    TrackingCode: true,
    Type: true,
    afp: true,
    startDate: format(startOfMonth(new Date()), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
  };

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      leadsReportResponse: observable,
      leadsReportParams: observable,
      // Computed -
      leadsData: computed,
      leadsColumns: computed,
      //Actions
      setStartDate: action,
      setEndDate: action,
      // XHR Actions
      runReport: action,
      runInitialReport: action,
    });
  }

  public runReport = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);

      const { data } = await getLeadsReport(this.leadsReportParams);
      runInAction(() => {
        this.leadsReportResponse = data;
      });
    } catch (error) {
      console.log(error);
    }
    this.rootStore.main.setLoading(false);
  };

  public runInitialReport = async (): Promise<void> => {
    try {
      const { data } = await getLeadsReport({
        endDate: this.leadsReportParams.endDate,
        startDate: this.leadsReportParams.startDate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  public setStartDate = (date: string | null): void => {
    this.leadsReportParams.startDate = date;
  };

  public setEndDate = (date: string | null): void => {
    this.leadsReportParams.endDate = date;
  };

  get leadsData(): GetLeadsReportResponse {
    const data = this?.leadsReportResponse?.length
      ? this.leadsReportResponse
      : [];
    return data;
  }

  get leadsColumns(): Array<{ accessor: string; Header: string }> {
    const columns = this?.leadsReportResponse?.length
      ? Object.keys(this.leadsReportResponse[0]).map((key) =>
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

export default LeadsReportStore;