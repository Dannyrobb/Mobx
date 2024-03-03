import { format } from 'date-fns';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { getCustomerBonuses } from '../../api/api';
import { CustomerBonusesObj } from '@cellxpert/api-types';
import StoreBase from '../StoreBase';

class CustomerProfileBonusesStore extends StoreBase {
  public customerProfileBonusesResponse: CustomerBonusesObj[] | null = null;
  public startDate: string | null = format(new Date('2000-1-1'), 'MM/d/yyyy');
  public endDate: string | null = format(new Date(Date.now()), 'MM/d/yyyy');

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      customerProfileBonusesResponse: observable,
      startDate: observable,
      endDate: observable,
      // Computed -
      bonusesData: computed,
      bonusesColumns: computed,
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

      const { data } = await getCustomerBonuses({
        startDate: this.startDate,
        endDate: this.endDate,
        userid: this.userId,
      });
      runInAction(() => {
        this.customerProfileBonusesResponse = data;
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

  get bonusesData(): CustomerBonusesObj[] {
    const data = this?.customerProfileBonusesResponse?.length ? this.customerProfileBonusesResponse : [];
    return data;
  }

  get bonusesColumns(): Array<{ accessor: string; Header: string }> {
    const columns = this?.customerProfileBonusesResponse?.length
      ? Object.keys(this.customerProfileBonusesResponse[0]).map((key) =>
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

export default CustomerProfileBonusesStore;
