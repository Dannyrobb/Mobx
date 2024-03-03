import { action, computed, makeObservable, observable } from 'mobx';
import StoreBase from './StoreBase';

import { MediaReportObj, GetAvailableBrandsObj } from '@cellxpert/api-types';
import { getMediaReport, getAvailableBrands, getAffiliateManagerData, getIbDashboardRegistrations } from '../api/api';
import { format, startOfMonth, sub } from 'date-fns';
import { compareTimePeriods } from '../utils/compare-time-periods';

class IbDashboardStore extends StoreBase {
  public startDate = format(startOfMonth(new Date()), 'MM/d/yyyy');
  public endDate = format(new Date(), 'MM/d/yyyy');
  public comparedStart = format(
    sub(startOfMonth(new Date()), {
      months: 1,
    }),
    'MM/d/yyyy'
  );
  public comparedEnd = format(sub(new Date(), { months: 1 }), 'MM/d/yyyy');

  public currentPeriodResponse: MediaReportObj | null = null;
  public comparedPeriodResponse: MediaReportObj | null = null;
  public brands: GetAvailableBrandsObj[] | null = null;
  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      currentPeriodResponse: observable,
      comparedPeriodResponse: observable,
      brands: observable,
      // Computed -
      comparedData: computed,
      // Actions
      runReport: action,
      // XHR Actions
      getDashboardData: action,
      getComparedData: action,
      getManagerData: action,
      getIbDashboardRegistrations: action,
    });
  }

  public getDashboardData = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(false);
      const { data } = await getMediaReport({
        startDate: this.startDate,
        endDate: this.endDate,
        DateFormat: 'all',
        day: true,
      });
      // console.log(data);
      this.currentPeriodResponse = data[0];
    } catch (error) {
      console.error('error', error);
      this.rootStore.main.setLoading(false);
    }
  };
  public getComparedData = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(false);
      const { data } = await getMediaReport({
        startDate: this.comparedStart,
        endDate: this.comparedEnd,
        DateFormat: 'all',
        day: true,
      });
      // console.log(data);

      this.currentPeriodResponse = data[0];
    } catch (error) {
      console.error('error', error);
      this.rootStore.main.setLoading(false);
    }
  };
  public getAvailableBrands = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(false);
      const { data } = await getAvailableBrands();
      // console.log(data);

      this.brands = data.AvailableBrands;
    } catch (error) {
      console.error('error', error);
      this.rootStore.main.setLoading(false);
    }
  };
  public getManagerData = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(false);
      const { data } = await getAffiliateManagerData({ json: 1 });
      // console.log(data);

      // this.brands = data;÷÷÷
    } catch (error) {
      console.error('error', error);
      this.rootStore.main.setLoading(false);
    }
  };
  public getIbDashboardRegistrations = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(false);
      const { data } = await getIbDashboardRegistrations({
        startDate: this.startDate,
        endDate: this.endDate,
        limit: 10,
        daterange: 'fdd',
      });
      console.log(data);

      // this.brands = data;÷÷÷
    } catch (error) {
      console.error('error', error);
      this.rootStore.main.setLoading(false);
    }
  };

  get comparedData(): Record<keyof MediaReportObj, string> | {} {
    if (!this.comparedPeriodResponse && !this.currentPeriodResponse) return {};
    return compareTimePeriods(this.currentPeriodResponse, this.comparedPeriodResponse);
  }
  public runReport = async () => {
    this.getDashboardData();
    this.getComparedData();
    this.getAvailableBrands();
    this.getManagerData();
    this.getIbDashboardRegistrations();
  };
}

export default IbDashboardStore;
