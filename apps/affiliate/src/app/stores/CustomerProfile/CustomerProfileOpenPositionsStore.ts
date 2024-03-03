import { CustomerPositionsObj } from '@cellxpert/api-types';
import { format } from 'date-fns';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { getCustomerOpenPositions } from '../../api/api';
import StoreBase from '../StoreBase';

class CustomerProfileOpenPositionsStore extends StoreBase {
  public customerProfileOpenPositionsResponse: CustomerPositionsObj[] | null = null;
  public startDate: string | null = format(new Date('2000-1-1'), 'MM/d/yyyy');
  public endDate: string | null = format(new Date(Date.now()), 'MM/d/yyyy');

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      customerProfileOpenPositionsResponse: observable,
      startDate: observable,
      endDate: observable,
      // Computed -
      openPositionsData: computed,
      openPositionsColumns: computed,
      userId: computed,
      //Actions
      setStartDate: action,
      setEndDate: action,
      // XHR Actions
      runReport: action,
    });
  }

  get userId(): string {
    return this.rootStore.customerProfile.userId;
  }

  public runReport = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);
      const { data } = await getCustomerOpenPositions({
        startDate: this.startDate,
        endDate: this.endDate,
        userid: this.userId,
      });
      runInAction(() => {
        this.customerProfileOpenPositionsResponse = data;
      });
    } catch (error) {
      console.log(error);
    }
    this.rootStore.main.setLoading(false);
  };

  public setStartDate = (date: string | null): void => {
    this.startDate = date;
  };

  public setEndDate = (date: string | null): void => {
    this.endDate = date;
  };

  get openPositionsData(): CustomerPositionsObj[] {
    const data = this?.customerProfileOpenPositionsResponse?.length ? this.customerProfileOpenPositionsResponse : [];
    return data;
  }

  get openPositionsColumns(): Array<{ accessor: string; Header: string }> {
    const columns = this?.customerProfileOpenPositionsResponse?.length
      ? Object.keys(this.customerProfileOpenPositionsResponse[0]).map((key) =>
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

export default CustomerProfileOpenPositionsStore;
