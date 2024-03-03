import { CustomerCommissionObj } from '@cellxpert/api-types';
import { format } from 'date-fns';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { getCustomerCommissions } from '../../api/api';
import StoreBase from '../StoreBase';

class CustomerProfileCommissionsStore extends StoreBase {
  public customerProfileCommissionsResponse: CustomerCommissionObj[] | null = null;
  public startDate: string | null = format(new Date('2000-1-1'), 'MM/d/yyyy');
  public endDate: string | null = format(new Date(Date.now()), 'MM/d/yyyy');

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      customerProfileCommissionsResponse: observable,
      startDate: observable,
      endDate: observable,
      // Computed -
      commissionsData: computed,
      commissionsColumns: computed,
      userId: computed,
      //Actions
      setStartDate: action,
      setEndDate: action,
      // XHR Actions
      // getCustomerCommissions: action,
      runReport: action,
    });
  }

  get userId(): string {
    return this.rootStore.customerProfile.userId;
  }

  public runReport = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);

      const { data } = await getCustomerCommissions({
        startDate: this.startDate,
        endDate: this.endDate,
        userid: this.userId,
      });
      runInAction(() => {
        this.customerProfileCommissionsResponse = data;
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

  get commissionsData(): CustomerCommissionObj[] {
    const data = this?.customerProfileCommissionsResponse?.length ? this.customerProfileCommissionsResponse : [];
    return data;
  }

  get commissionsColumns(): Array<{ accessor: string; Header: string }> {
    const columns = this?.customerProfileCommissionsResponse?.length
      ? Object.keys(this.customerProfileCommissionsResponse[0]).map((key) =>
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

export default CustomerProfileCommissionsStore;
