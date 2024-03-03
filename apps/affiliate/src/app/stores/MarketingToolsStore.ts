import { extractFilterKeys } from './../utils/marketing-tools';
import { action, computed, makeObservable, observable, runInAction, values, when } from 'mobx';

import StoreBase from './StoreBase';

import { getMarketingTools, getMarketingToolsFilters } from '../api/api';
import {
  GetMarketingToolsParams,
  MarketingToolsFiltersKeys,
  MarketingToolsFiltersObj,
  MarketingToolsObj,
} from '@cellxpert/api-types';

class MarketingToolsStore extends StoreBase {
  public marketingToolsParams: GetMarketingToolsParams = { private: false };
  public marketingToolsResponse: MarketingToolsObj[] | null = null;
  public marketingToolsFiltersResponse: MarketingToolsFiltersObj[] | null = null;
  public filterObject: Record<MarketingToolsFiltersKeys, Record<string, boolean>> | null = null;

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      marketingToolsParams: observable,
      marketingToolsResponse: observable,
      marketingToolsFiltersResponse: observable,
      filterObject: observable,
      // Computed -
      marketingToolsFiltersData: computed,
      //Actions
      toggleFilterByKeyAndValue: action,
      // XHR Actions
      getMarketingTools: action,
      getMarketingToolsFilters: action,
    });

    when(
      () => !!this.marketingToolsFiltersResponse,
      () => {
        this.filterObject = extractFilterKeys(this.marketingToolsFiltersResponse);
      }
    );
  }

  public getFeaturedMarketingTools = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);
      const { data } = await getMarketingTools({
        featured: 1,
        limit: 10,
      });

      if (data && data.Creatives) {
        runInAction(() => {
          this.marketingToolsResponse = data.Creatives;
        });
      }
    } catch (error) {
      console.error('error', error);
    }
    this.rootStore.main.setLoading(false);
  };

  public getMarketingTools = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);
      const { data } = await getMarketingTools({
        ...this.marketingToolsParams,
      });

      if (data && data.Creatives) {
        runInAction(() => {
          this.marketingToolsResponse = data.Creatives;
        });
      }
    } catch (error) {
      console.error('error', error);
    }
    this.rootStore.main.setLoading(false);
  };

  public getMarketingToolsFilters = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(false);
      const { data } = await getMarketingToolsFilters({ visibilityfilter: true });

      runInAction(() => {
        this.marketingToolsFiltersResponse = data.MarketingToolsFilters;
      });
    } catch (error) {
      console.error('error', error);
      this.rootStore.main.setLoading(false);
    }
  };

  public getEnabledFiltersArrayByKey = (key: MarketingToolsFiltersKeys): string[] => {
    if (!this.filterObject) return [];

    const singleFilter = this.filterObject[key];
    const validKeysArray = Object.keys(singleFilter).filter(function (objKeys) {
      return singleFilter[objKeys];
    });
    if (key !== 'Enabled') this.marketingToolsParams[key] = validKeysArray;
    return validKeysArray;
  };

  get marketingToolsFiltersData(): Partial<Record<MarketingToolsFiltersKeys, Record<string, number>>> | null {
    if (!this.marketingToolsFiltersResponse || this.marketingToolsFiltersResponse.length < 1 || !this.filterObject)
      return null;

    const filterKeys = Object.keys(this.filterObject) as MarketingToolsFiltersKeys[];
    const enabledKeys: Array<string[]> = filterKeys.map((filter) => this.getEnabledFiltersArrayByKey(filter));

    let filteredObj: Partial<Record<MarketingToolsFiltersKeys, Record<string, number>>> = {};

    filterKeys.forEach((mainKey) => {
      // We Filter All Results for Each Filter Key (Brand/Type/Name/etc..) Excluding the Key Itself (since shoudnt reflect in dropdown)
      const filtered = this.marketingToolsFiltersResponse?.filter((item) => {
        // If any of the keys didnt match the applied filters it will return 'false' therfore 'some' is used
        return !filterKeys
          .map((filterKey: MarketingToolsFiltersKeys, index) => {
            // Exclution of the key we're calculating, if no filters applied return true
            if (mainKey === filterKey || enabledKeys[index].length < 1) return true;
            // Match marketing tool value in key to enabled options
            return enabledKeys[index].includes(item[filterKey] as string);
          })
          .some((el) => el === false);
      });

      // this part is responsible counting occurences of values (brandValues/nameValues/etc..) based on the key we're calculating
      // then sets it on filteredObj which is returned after all Keys were calculated
      filteredObj[mainKey] = filtered?.reduce((acc, item) => {
        const newKey = item[mainKey] as string;

        if (!acc[newKey]) acc[newKey] = 1;
        else acc[newKey]++;
        return acc;
      }, {} as Record<string, number>);
    });
    return filteredObj;
  }

  public toggleFilterByKeyAndValue = (key: MarketingToolsFiltersKeys, value: string): void => {
    if (!this.filterObject) return;
    this.filterObject[key][value] = !this.filterObject[key][value];
  };
  public togglePublicPrivateValue = (value: boolean): void => {
    this.marketingToolsParams.private = value;
  };
}

export default MarketingToolsStore;
