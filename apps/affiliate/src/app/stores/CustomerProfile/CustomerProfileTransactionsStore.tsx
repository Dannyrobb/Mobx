import { format } from 'date-fns';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { getCustomerTransactions } from '../../api/api';
import { GetTransactionsReportResponse, CustomerTransactionsObj } from '@cellxpert/api-types';
import StoreBase from '../StoreBase';

class CustomerProfileTransactionsStore extends StoreBase {
  public customerProfileTransactionsResponse: GetTransactionsReportResponse | null = null;
  public startDate: string | null = format(new Date('2000-1-1'), 'MM/d/yyyy');
  public endDate: string | null = format(new Date(Date.now()), 'MM/d/yyyy');

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      customerProfileTransactionsResponse: observable,
      startDate: observable,
      endDate: observable,
      // Computed -
      transactionsData: computed,
      transactionsColumns: computed,
      userId: computed,
      //Actions
      setStartDate: action,
      setEndDate: action,
      // XHR Actions
      // getCustomerTransactions: action,
      runReport: action,
    });
  }

  get userId(): string {
    return this.rootStore.customerProfile.userId;
  }

  public runReport = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);

      const { data } = await getCustomerTransactions({
        startDate: this.startDate,
        endDate: this.endDate,
        userid: this.userId,
      });
      runInAction(() => {
        this.customerProfileTransactionsResponse = data;
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

  get transactionsData(): GetTransactionsReportResponse {
    const data = this?.customerProfileTransactionsResponse?.length ? this.customerProfileTransactionsResponse : [];
    return data;
  }

  get transactionsColumns(): Array<{ accessor: string; Header: string }> {
    const columns = this?.customerProfileTransactionsResponse?.length
      ? Object.keys(this.customerProfileTransactionsResponse[0]).map((key) =>
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

export default CustomerProfileTransactionsStore;
