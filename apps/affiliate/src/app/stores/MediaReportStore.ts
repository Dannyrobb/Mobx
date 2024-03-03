import {action, computed, makeObservable, observable, runInAction} from 'mobx';

import StoreBase from './StoreBase';

import {getMediaReport} from '../api/api';
import {format, startOfMonth} from 'date-fns';

import {Option, SingleFilter} from '@cellxpert/ui-lib';
import {MediaReportParams, MediaReportResponse, MediaReportObj} from '@cellxpert/api-types';

class MediaReportStore extends StoreBase {
  public reportBreakdowns: Array<keyof Pick<MediaReportParams, 'Brand' | 'Language' | 'Name' | 'Size' | 'trackingCode' | 'Type' | 'Country'>> =
    ['Brand', 'trackingCode', 'Language', 'Type', 'Size', 'Name', 'Country'];
  public reportFilters: Option[] = [
    {key: 'userid', value: 'userid', label: 'User Id'},
    {key: 'brand', value: 'brand', label: 'Brand'},
    {key: 'trackingCode', value: 'trackingCode', label: 'Tracking Code'},
    {key: 'language', value: 'language', label: 'Language'},
    {key: 'type', value: 'type', label: 'Type'},
    {key: 'size', value: 'size', label: 'Size'},
    {key: 'name', value: 'name', label: 'Name'},
  ];
  // public allBreakdownsSelected: boolean = false;
  public mediaReportResponse: MediaReportResponse | null = null;
  public mediaReportRequestParams: MediaReportParams = {
    startDate: format(startOfMonth(new Date()), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
    day: true,
    DateFormat: 'day'
  };

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      reportBreakdowns: observable,
      mediaReportResponse: observable,
      mediaReportRequestParams: observable,
      // Computed -
      mediaData: computed,
      mediaColumns: computed,
      runReportDisabled: computed,
      //Actions
      setStartDate: action,
      setEndDate: action,
      setMediaFilters: action,
      toggleBooleanBreakdown: action,
      setDateFormat: action,
      selectAll: action,
      // XHR Actions
      runReport: action,
    });
  }

  public runReport = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);

      const {data} = await getMediaReport(this.mediaReportRequestParams);
      runInAction(() => {
        this.mediaReportResponse = data;
      });
    } catch (error) {
      console.log(error);
    }
    this.rootStore.main.setLoading(false);
  };

  public setStartDate = (date: string | null): void => {
    this.mediaReportRequestParams.startDate = date;
  };

  public setEndDate = (date: string | null): void => {
    this.mediaReportRequestParams.endDate = date;
  };

  public setDateFormat = (dateOption: 'day' | 'month' | 'year' | 'none'): void => {
    if (dateOption === 'none') {
      this.mediaReportRequestParams.day = false;
      delete this.mediaReportRequestParams.DateFormat;

    } else {
      this.mediaReportRequestParams.day = true;
      this.mediaReportRequestParams.DateFormat = dateOption;
    }
  };

  public selectAll = (selected: boolean) => {
    this.reportBreakdowns.forEach((breakdown) => {
      if (selected) {
        this.mediaReportRequestParams[breakdown] = true;
      } else {
        delete this.mediaReportRequestParams[breakdown];
      }
    })
  }

  public toggleBooleanBreakdown = (
    key: keyof Pick<MediaReportParams, 'Brand' | 'Language' | 'Name' | 'Size' | 'trackingCode' | 'Type' | 'Country'>
  ): void => {
    this.mediaReportRequestParams[key] ? delete this.mediaReportRequestParams[key] : (this.mediaReportRequestParams[key] = true);
  };

  public setMediaFilters = (filters: SingleFilter[]): void => {
    type FiltersType = keyof Pick<MediaReportParams,
      | 'filter-brand'
      | 'filter-language'
      | 'filter-name'
      | 'filter-size'
      | 'filter-trackingCode'
      | 'filter-type'>;

    //clear preexisitng filters in case they were taken out
    const allPossibleFilters: FiltersType[] = ['filter-brand', 'filter-language', 'filter-name', 'filter-size', 'filter-trackingCode', 'filter-type']
    allPossibleFilters.forEach((filter) => {
      this.mediaReportRequestParams[filter] && delete this.mediaReportRequestParams[filter]
    })

    filters.forEach((filter) => {
      const filterName = `filter-${filter.filter}` as FiltersType
      this.mediaReportRequestParams[filterName] = filter.value;
    });
  };

  get mediaData(): MediaReportResponse | [] {
    const data = this?.mediaReportResponse?.length ? this.mediaReportResponse : [];
    return data;
  }

  get mediaColumns(): Array<{ accessor: string; Header: string }> {
    const columns = this?.mediaReportResponse?.length
      ? Object.keys(this.mediaReportResponse[0]).map((key) =>
        !key.includes('Date') && !this.rootStore.main.nonSumColumns.includes(key)
          ? {
            accessor: key,
            Header: key,
            footerParams: {format: 'sum'},
          }
          : {accessor: key, Header: key}
      )
      : [];
    return columns;
  }

  get runReportDisabled(): boolean {
    let noBreakdownSelected: boolean = false;
    if (this.mediaReportRequestParams.day = false || !this.mediaReportRequestParams.DateFormat) {
      noBreakdownSelected = !(this.reportBreakdowns.some((breakdown) => {
        return this.mediaReportRequestParams[breakdown] === true
      }))
    }
    return noBreakdownSelected;
  }
}

export default MediaReportStore;
