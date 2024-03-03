import { MarketingToolsFiltersObj } from '@cellxpert/api-types';

type Key = keyof MarketingToolsFiltersObj;

export const extractFilterKeys = (
  marketingToolsFiltersResponse: MarketingToolsFiltersObj[] | null
): Record<Key, Record<string, boolean>> | null => {
  const filters = marketingToolsFiltersResponse;
  if (!filters) {
    return null;
  }

  const keys = Object.keys(filters[0]) as Key[];

  const result = keys.reduce<Record<Key, Record<string, boolean>>>((acc, key) => {
    let values: Partial<Record<Key, boolean>> = {};

    filters.map((filter) => {
      let newKey = filter[key] as Key;
      values[newKey] = false;
    });
    // remove enabled
    if (key === 'Enabled') {
      return { ...acc };
    } else {
      return {
        ...acc,
        [key]: values,
      };
    }
  }, {} as Record<Key, Record<string, boolean>>);

  return result;
};
