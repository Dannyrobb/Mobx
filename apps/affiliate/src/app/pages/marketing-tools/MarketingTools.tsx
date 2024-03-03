import * as React from 'react';

import { flexStartCenter, theme, Theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/setupContext';
import { MarketingToolsFiltersKeys, MarketingToolsObj } from '@cellxpert/api-types';
import { Button, Option, Select, Typography } from '@cellxpert/ui-lib';

export interface MarketingToolsProps {
  data: MarketingToolsObj[] | null;
  toggleFilterByKeyAndValue: (key: MarketingToolsFiltersKeys, value: string) => void;
  marketingToolsFiltersData: Partial<Record<MarketingToolsFiltersKeys, Record<string, number>>> | null;
  getEnabledFiltersArrayByKey: (key: MarketingToolsFiltersKeys) => string[];
  getMarketingTools: () => void;
}

const FiltersWrapper = styled('div')(({}) => ({
  ...flexStartCenter,
}));

const PageWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.blacks.background,
}));

const HeaderWrap = styled('div')(({ theme }) => ({
  padding: `${theme.gutters.base * 4}px ${theme.gutters.base * 4}px`,
  margin: ` 0  ${theme.gutters.base * 4}px`,
  borderBottom: `1px solid ${theme.palette.blacks.border}`,
}));

export const MarketingTools: React.FunctionComponent<MarketingToolsProps> = ({
  toggleFilterByKeyAndValue,
  marketingToolsFiltersData,
  getEnabledFiltersArrayByKey,
  getMarketingTools,
  data,
}) => {
  return (
    <>
      <PageWrapper>
        <HeaderWrap>
          <Typography {...{ variant: 'h5', color: 'main', style: { marginBottom: theme.gutters.base * 6 } }}>
            Marketing Tools
          </Typography>
          <FiltersWrapper>
            <Typography {...{ variant: 'body2', color: 'label' }}> Filter by:</Typography>
            {marketingToolsFiltersData &&
              (Object.keys(marketingToolsFiltersData) as MarketingToolsFiltersKeys[]).map((key) => {
                return (
                  <Select
                    {...{
                      key: key,
                      size: 'small',
                      withInnerSearch: true,
                      withCheckboxes: true,
                      isMultiSelect: true,
                      placeholder: key,
                      searchPlaceholder: 'Search ' + key,
                      options: Object.keys(marketingToolsFiltersData[key] as Record<string, number>).map(
                        (marketingKey) => ({
                          key: marketingKey,
                          label: marketingKey,
                          value: marketingKey,
                          additionalData: marketingToolsFiltersData[key]![marketingKey],
                        })
                      ),
                      columnOrder: Object.keys(marketingToolsFiltersData[key] as Record<string, number>).sort(
                        (a, b) => {
                          return marketingToolsFiltersData[key]![b] - marketingToolsFiltersData[key]![a];
                        }
                      ),
                      selected: getEnabledFiltersArrayByKey(key).map((selectedKeys) => ({
                        key: selectedKeys,
                        label: selectedKeys,
                        value: selectedKeys,
                      })),
                      onChange: (option) => {
                        toggleFilterByKeyAndValue(key, option.value);
                      },
                    }}
                  />
                );
              })}
            <Button
              {...{
                label: 'Apply filters',
                size: 'small',
                onClick: getMarketingTools,
              }}
            />
          </FiltersWrapper>
        </HeaderWrap>
        <div>{data && JSON.stringify(data)}</div>
      </PageWrapper>
    </>
  );
};

const Observed = observer(MarketingTools);

const WithStoreConnection = () => {
  const { marketingTools } = useStore();

  const {
    getMarketingTools,
    marketingToolsResponse,
    getMarketingToolsFilters,
    marketingToolsFiltersData,
    toggleFilterByKeyAndValue,
    getEnabledFiltersArrayByKey,
    getFeaturedMarketingTools,
  } = marketingTools;
  React.useEffect(() => {
    getFeaturedMarketingTools();
    getMarketingToolsFilters();
  }, []);

  return (
    <Observed
      {...{
        // Props From Store Go Here
        data: marketingToolsResponse,
        marketingToolsFiltersData,
        toggleFilterByKeyAndValue,
        getEnabledFiltersArrayByKey,
        getMarketingTools,
      }}
    />
  );
};
export default observer(WithStoreConnection);

// FILTERING FUNCTION FOR SEARCH ELEMENT
// result = y.filter(o =>
//   keys.some(k =>
//       o[k]? o[k].toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1 : false));
