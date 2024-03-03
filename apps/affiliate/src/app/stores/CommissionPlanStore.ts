import { action, computed, makeObservable, observable } from 'mobx';

import StoreBase from './StoreBase';

import { getCommissionPlan } from '../api/api';
import { GetCommissionPlanResponse } from '@cellxpert/api-types';
import { CommissionPlanDataRow, CommissionPlanPageProps } from '../pages/commission-plan/CommissionPlan';
import {
  handleCpa,
  handleRevshare,
  handleSubAffiliate,
  handleCpl,
  handleFixed,
} from '../utils/commission-plan-converters';

// TODO - Fetch Data
// TODO - Update Data
// TODO - Manipulate Fetched Data to work with component's interface

class CommissionPlanStore extends StoreBase {
  public commissionPlanResponse: GetCommissionPlanResponse | null = null;
  public searchTerm: string = '';

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      searchTerm: observable,
      commissionPlanResponse: observable,

      // Computeds -
      fields: computed,

      // Actions
      setSearchTerm: action,
      // setActiveTab: action,
      // XHR Actions
      getCommissionPlan: action,
    });
  }

  get fields(): CommissionPlanPageProps['data'] {
    const plans = this.commissionPlanResponse?.CommissionPlans;

    if (!plans) {
      return [];
    }

    const output = plans.map((plan) => {
      const cpa = handleCpa(plan.CPA);
      const revshare = handleRevshare(plan.RevShare);
      const subAffiliate = handleSubAffiliate(plan.SubAffiliates);
      const cpl = handleCpl(plan.CPL);
      const cpi = handleCpl(plan.CPI, 'CPI');
      const premiumCpl = handleCpl(
        { PremiumCPLByCountry: plan.PremiumCPLByCountry ? plan.PremiumCPLByCountry : [] },
        'Premium CPL By Country'
      );
      const fixed = handleFixed(plan.Fixed);

      const info = [cpa, ...revshare, ...subAffiliate, ...cpl, ...cpi, ...premiumCpl, ...fixed].filter(Boolean);

      // filter will remove possible undefiends from array therefor 'info as'
      return {
        sectionName: plan.brandName,
        info: info as CommissionPlanDataRow[],
      };
    });

    // Each item is the array needed for each accordion
    return output;
  }

  public setSearchTerm = (newSearchTerm: string) => {
    console.log({ newSearchTerm });
    this.searchTerm = newSearchTerm;
  };

  public updateCommissionPlan = async (payload: unknown) => {
    console.log({ payload });
  };

  public getCommissionPlan = async () => {
    try {
      this.rootStore.main.setLoading(false);
      const { data } = await getCommissionPlan();
      this.commissionPlanResponse = data;
    } catch (error) {
      console.error('error', error);
      this.rootStore.main.setLoading(false);
    }
  };
}

export default CommissionPlanStore;
