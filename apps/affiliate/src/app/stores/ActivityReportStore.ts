import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import StoreBase from './StoreBase';

import { getComputedActivityReport } from '../api/api';
import { format, startOfMonth } from 'date-fns';

import { Option, SingleFilter } from '@cellxpert/ui-lib';
import { GetComputedActivityReportParams, GetComputedActivityReportResponse } from '@cellxpert/api-types';

class ActivityReportStore extends StoreBase {
  public reportBreakdowns: Array<
    keyof Pick<GetComputedActivityReportParams, 'Brand' | 'Language' | 'Name' | 'Size' | 'TrackingCode' | 'Type'>
  > = ['Brand', 'TrackingCode', 'Language', 'Type', 'Size', 'Name'];
  public reportFilters: Option[] = [
    { key: 'userid', value: 'userid', label: 'User Id' },
    { key: 'brand', value: 'brand', label: 'Brand' },
    { key: 'trackingCode', value: 'trackingCode', label: 'Tracking Code' },
    { key: 'language', value: 'language', label: 'Language' },
    { key: 'type', value: 'type', label: 'Type' },
    { key: 'size', value: 'size', label: 'Size' },
    { key: 'name', value: 'name', label: 'Name' },
  ];
  public activityReportResponse: GetComputedActivityReportResponse | null = null;
  public activityReportParams: GetComputedActivityReportParams = {
    startDate: format(startOfMonth(new Date()), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
    // Brand: null,
    // Language: null,
    // Name: null,
    // Size: null,
    // TrackingCode: null,
    // Type: null,
    // afp: null,
    // 'filter-brand': '',
    // 'filter-language': '',
    // 'filter-name': '',
    // 'filter-size': '',
    // 'filter-trackingCode': '',
    // 'filter-type': '',
    // 'filter-userid': '',
  };

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      reportBreakdowns: observable,
      activityReportResponse: observable,
      activityReportParams: observable,
      // Computed -
      activityData: computed,
      activityColumns: computed,
      //Actions
      setStartDate: action,
      setEndDate: action,
      setActivityFilters: action,
      toggleBooleanBreakdown: action,
      // XHR Actions
      runReport: action,
    });
  }

  public runReport = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);

      const { data } = await getComputedActivityReport(this.activityReportParams);
      runInAction(() => {
        this.activityReportResponse = data;
      });
    } catch (error) {
      console.log(error);
    }
    this.rootStore.main.setLoading(false);
  };

  public setStartDate = (date: string | null): void => {
    this.activityReportParams.startDate = date;
  };

  public setEndDate = (date: string | null): void => {
    this.activityReportParams.endDate = date;
  };

  public toggleBooleanBreakdown = (
    key: keyof Pick<GetComputedActivityReportParams, 'Brand' | 'Language' | 'Name' | 'Size' | 'TrackingCode' | 'Type'>
  ): void => {
    this.activityReportParams[key] ? delete this.activityReportParams[key] : (this.activityReportParams[key] = true);
  };

  public setActivityFilters = (filters: SingleFilter[]): void => {
    filters.forEach((filter) => {
      const filterName = `filter-${filter.filter}` as keyof Pick<
        GetComputedActivityReportParams,
        | 'filter-brand'
        | 'filter-userid'
        | 'filter-language'
        | 'filter-name'
        | 'filter-size'
        | 'filter-trackingCode'
        | 'filter-type'
      >;

      this.activityReportParams[filterName] = filter.value;
    });
  };

  //   public setRegistrationsDateFilters(data: RegistrationsReportObj): void {
  //     const options = Object.keys(data).reduce((results: RegFilterOption[], key) => {
  //       if (key in allAffiliateFilters) results.push(allAffiliateFilters[key]);
  //       return results;
  //     }, []);

  //     this.registrationsReportFilters = options;
  //   }

  get activityData(): GetComputedActivityReportResponse | [] {
    const data = this?.activityReportResponse?.length ? this.activityReportResponse : [];
    return data;
  }

  get activityColumns(): Array<{ accessor: string; Header: string }> {
    // return [];
    const columns = this?.activityReportResponse?.length
      ? Object.keys(this.activityReportResponse[0]).map((key) =>
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

export default ActivityReportStore;
