import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import StoreBase from './StoreBase';

import { getRegistrationsReport } from '../api/api';
import { RegFilterOption } from '../pages/registration-report/RegistrationReport';
import { format, startOfMonth } from 'date-fns';

import {
  GetRegistrationsReportParams,
  GetRegistrationsReportResponse,
  RegistrationsReportObj,
} from '@cellxpert/api-types';

//  They're affiliates that restricted from seeing some fields by config, this affects the filters we allow them based on "initial" registrations report
const allAffiliateFilters: { [key: string]: RegFilterOption } = {
  Registration_Date: { key: 'Registration_Date', label: 'Registration date', value: 'registrationdate' },
  First_Deposit_Date: { key: 'First_Deposit_Date', label: 'First deposit date', value: 'fdd' },
  Qualification_Date: { key: 'Qualification_Date', label: 'Qualification Date', value: 'qualificationdate' },
  Commission: { key: 'Commission', label: 'Commission date', value: 'commission' },
  Deposits: { key: 'Deposits', label: 'Deposit date', value: 'deposit' },
  Withdrawals: { key: 'Withdrawals', label: 'Withdrawal date', value: 'withdrawal' },
  Open_Positions: { key: 'Open_Positions', label: 'Open position date', value: 'open_positions' },
  Position_Count: { key: 'Position_Count', label: 'Closed position date', value: 'position_count' },
};

class RegistrationReportStore extends StoreBase {
  public registrationsReportResponse: GetRegistrationsReportResponse | null = null;
  public registrationsReportFilters: RegFilterOption[] | null = null;
  public selectedFilter: RegFilterOption = {
    key: 'Registration_Date',
    label: 'Registration date',
    value: 'registrationdate',
  };
  public registrationsReportParams: GetRegistrationsReportParams = {
    userid: '',
    Brand: true,
    DateFormat: 'Day',
    Day: true,
    Language: true,
    NCI: true,
    Name: true,
    Size: true,
    TrackingCode: true,
    Type: true,
    afp: true,
    daterange: 'registrationdate',
    startDate: format(startOfMonth(new Date()), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
  };

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      registrationsReportResponse: observable,
      registrationsReportParams: observable,
      registrationsReportFilters: observable,
      selectedFilter: observable,
      // Computed -
      registrationsData: computed,
      registrationsColumns: computed,
      //Actions
      setStartDate: action,
      setEndDate: action,
      setSelectedFilter: action,
      // toggleBooleanBreakdown: action,
      // XHR Actions
      runReport: action,
      runInitialReport: action,
    });
  }

  public runReport = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);

      const { data } = await getRegistrationsReport(this.registrationsReportParams);
      runInAction(() => {
        this.registrationsReportResponse = data;
      });
    } catch (error) {
      console.log(error);
    }
    this.rootStore.main.setLoading(false);
  };

  public runInitialReport = async (): Promise<void> => {
    try {
      const { data } = await getRegistrationsReport({
        Day: true,
        afp: true,
        daterange: 'registrationdate',
        endDate: this.registrationsReportParams.endDate,
        startDate: this.registrationsReportParams.startDate,
        initial: 1,
      });
      runInAction(() => {
        this.setRegistrationsDateFilters(data.Registrations[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  public setStartDate = (date: string | null): void => {
    this.registrationsReportParams.startDate = date;
  };

  public setEndDate = (date: string | null): void => {
    this.registrationsReportParams.endDate = date;
  };

  public setUserIdFilter = (value: string): void => {
    this.registrationsReportParams.userid = value;
  };
  public setSelectedFilter = (option: RegFilterOption): void => {
    this.selectedFilter = option;
    this.registrationsReportParams.daterange = option.value;
  };

  // INCASE SOMEONE WOULD WANT TO RETURN BREAKDOWNS BEFORE RUN REPORT

  // public toggleBooleanBreakdown = (
  //   key: keyof Omit<
  //     GetRegistrationsReportParams,
  //     'startDate' | 'endDate' | 'DateFormat' | 'userid' | 'daterange' | 'initial'
  //   >
  // ): void => {
  //   this.registrationsReportParams[key] = !this.registrationsReportParams[key];
  // };

  public setRegistrationsDateFilters(data: RegistrationsReportObj): void {
    const options = Object.keys(data).reduce((results: RegFilterOption[], key) => {
      if (key in allAffiliateFilters) results.push(allAffiliateFilters[key]);
      return results;
    }, []);

    this.registrationsReportFilters = options;
  }

  get registrationsData(): RegistrationsReportObj[] {
    const data = this?.registrationsReportResponse?.Registrations.length
      ? this.registrationsReportResponse.Registrations
      : [];
    return data;
  }

  get registrationsColumns(): Array<{ accessor: string; Header: string }> {
    const columns = this?.registrationsReportResponse?.Registrations?.length
      ? Object.keys(this.registrationsReportResponse.Registrations[0]).map((key) =>
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

export default RegistrationReportStore;
