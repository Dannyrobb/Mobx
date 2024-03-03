import { CustomerPositionsObj } from '@cellxpert/api-types';
import { ColumnWithFooterParams } from '@cellxpert/ui-lib';
import { format } from 'date-fns';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { getCustomerPositions } from '../../api/api';
import StoreBase from '../StoreBase';

class CustomerProfilePositionsStore extends StoreBase {
  public customerProfilePositionsResponse: CustomerPositionsObj[] | null = null;
  public startDate: string | null = format(new Date('2000-1-1'), 'MM/d/yyyy');
  public endDate: string | null = format(new Date(Date.now()), 'MM/d/yyyy');
  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      customerProfilePositionsResponse: observable,
      startDate: observable,
      endDate: observable,
      // Computed -
      positionsData: computed,
      positionsColumns: computed,
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

      const { data } = await getCustomerPositions({
        startDate: this.startDate,
        endDate: this.endDate,
        userid: this.userId,
      });
      runInAction(() => {
        this.customerProfilePositionsResponse = data;
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

  get positionsData(): CustomerPositionsObj[] {
    const data = this?.customerProfilePositionsResponse?.length ? this.customerProfilePositionsResponse : [];
    return data;
  }
  get positionsColumns(): Array<ColumnWithFooterParams> {
    const columns = this?.customerProfilePositionsResponse?.length
      ? Object.keys(this.customerProfilePositionsResponse[0]).map((key) =>
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

export default CustomerProfilePositionsStore;
