import { makeObservable, action, observable, computed, runInAction } from 'mobx';
import { format, startOfMonth } from 'date-fns';
import {
  GetSubAffiliateReportParams,
  GetSubAffiliateReportResponse,
  SubAffiliateReportObj
} from '@cellxpert/api-types';

import StoreBase from './StoreBase';
import { getSubAffiliateReport } from '../api/api';

class SubAffiliateStore extends StoreBase {
  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      subAffiliateReportResponse: observable,
      subAffiliateReportParams: observable,
      // Computeds -
      subAffiliateLink: computed,
      subAffiliateData: computed,
      subAffiliateReportColumns: computed,
      // Actions
      setStartDate: action,
      setEndDate: action,
      // XHR Actions
      runReport: action,
      runInitialReport: action,
    });
  }

  get subAffiliateLink(): string | null {
    const link = this.rootStore.main.globalConfigResponse?.globalConfig.find(
      (item) => item.key === 'SubAffiliatesLink'
    )?.value;

    if (typeof link !== 'string') {
      return null;
    }

    return link;
  }
  public subAffiliateReportResponse: GetSubAffiliateReportResponse | null = null;
  public subAffiliateReportParams: GetSubAffiliateReportParams = {
    startDate: format(startOfMonth(new Date()), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
  };

  public runReport = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);

      const { data } = await getSubAffiliateReport(this.subAffiliateReportParams);
      runInAction(() => {
        this.subAffiliateReportResponse = data;
      });
    } catch (error) {
      console.log(error);
    }
    this.rootStore.main.setLoading(false);
  };

  public runInitialReport = async (): Promise<void> => {
    try {
      const { data } = await getSubAffiliateReport({
        // Day: true,
        // afp: true,
        // daterange: 'registrationdate',
        endDate: this.subAffiliateReportParams.endDate,
        startDate: this.subAffiliateReportParams.startDate,
        // initial: 1,
      });
      // runInAction(() => {
      //   this.setRegistrationsDateFilters(data.Registrations[0]);
      // });
    } catch (error) {
      console.log(error);
    }
  };

  public setStartDate = (date: string | null): void => {
    this.subAffiliateReportParams.startDate = date;
  };

  public setEndDate = (date: string | null): void => {
    this.subAffiliateReportParams.endDate = date;
  };

  get subAffiliateData(): SubAffiliateReportObj[] {
    const data = this?.subAffiliateReportResponse?.SubAffiliates.length
      ? this.subAffiliateReportResponse.SubAffiliates
      : [];
    return data;
  }

  get subAffiliateReportColumns(): Array<{ accessor: string; Header: string }> {
    const columns = this?.subAffiliateReportResponse?.SubAffiliates?.length
      ? Object.keys(this.subAffiliateReportResponse.SubAffiliates[0]).map((key) =>
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

export default SubAffiliateStore;
