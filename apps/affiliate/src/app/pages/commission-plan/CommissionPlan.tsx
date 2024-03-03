import * as React from 'react';

import { Theme } from '@cellxpert/theme';
import { Accordion, Search, Typography } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { Row as NewRow } from './components/Row';

import { useStore } from '../../stores/setupContext';

export interface CommissionPlanPageProps {
  data: { sectionName: string; info: CommissionPlanDataRow[] }[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export interface CommissionPlanDataRow {
  type: string;
  description: Array<{
    title?: string;
    descriptionRows?: string[];
  }>;
  amount: Array<{
    isEditable?: boolean;
    value: string | number;
    symbol: '%' | '$';
  }>;
}

export const Header = styled('header')(({ theme }) => ({
  padding: `${theme.gutters.base * 4}px ${theme.gutters.base * 4}px ${theme.gutters.base * 3}px`,
  backgroundColor: theme.palette.blacks.background,
  '& h1': {
    marginBottom: `${theme.gutters.base * 6}px`,
  },
}));

export const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.blacks.background,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

export const PageContent = styled('div')(() => ({
  flex: 1,
}));

export const CommissionPlanPage: React.FunctionComponent<CommissionPlanPageProps> = ({
  data,
  searchTerm,
  setSearchTerm,
}) => {
  console.log({ data });
  return (
    <Container>
      <Header>
        <Typography {...{ variant: 'h5', component: 'h1' }}>Commission plan</Typography>

        <Search
          {...{
            placeholder: 'Search Commission',
            value: searchTerm,
            label: 'User name',
            onChange: (e) => setSearchTerm(e.target.value),
            helper: 'Search by commission type, country or product',
          }}
        />

        {/*<CommissionSearch onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}} />*/}
      </Header>

      <PageContent>
        {data.map((dataItem) => {
          return (
            <Accordion
              {...{
                // isOpen: true,
                header: dataItem.sectionName ?? 'Section Name',
              }}
              content={
                <>
                  <NewRow>
                    <Typography {...{ variant: 'body2' }}>Commission Type</Typography>
                    <Typography {...{ variant: 'body2' }}>Description</Typography>
                    <Typography {...{ variant: 'body2' }} />
                    <Typography {...{ variant: 'body2' }}>Amount</Typography>
                  </NewRow>

                  {dataItem.info
                    .filter((row) => {
                      if (!searchTerm) return true;

                      if (row.type.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return true;
                      }
                      if (row.description.length > 0) {
                        row.description.forEach((element) => {
                          return element.title?.toLowerCase().includes(searchTerm.toLowerCase())
                            ? true
                            : element.descriptionRows
                            ? element.descriptionRows.forEach((el) => {
                                return el.toLowerCase().includes(searchTerm.toLowerCase()) ? true : false;
                              })
                            : false;
                        });
                      }
                      return false;
                    })
                    .map((row) => {
                      console.log({ row });
                      return (
                        <NewRow>
                          <Typography {...{ variant: 'body2', color: 'dark' }}>{row.type}</Typography>
                          <div
                            {...{
                              style: {},
                            }}
                          >
                            {row.description.map((desc) => {
                              return <Typography {...{ variant: 'body2', color: 'dark' }}>{desc.title}</Typography>;
                            })}
                          </div>
                          <div
                            {...{
                              style: {
                                display: 'flex',
                                flexDirection: 'column',
                              },
                            }}
                          >
                            {row.description.map((desc) => {
                              return (
                                <div>
                                  {desc.descriptionRows ? (
                                    desc.descriptionRows.map((descRow) => {
                                      return (
                                        <Typography {...{ variant: 'body2', color: 'dark' }}>{descRow}</Typography>
                                      );
                                    })
                                  ) : (
                                    <div />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div {...{ style: {} }}>
                            {row.amount.map((amount) => {
                              return (
                                <Typography {...{ variant: 'body2', color: 'dark' }}>
                                  {amount.value} {amount.symbol}
                                </Typography>
                              );
                            })}
                          </div>
                        </NewRow>
                      );
                    })}
                </>
              }
            />
          );
        })}
      </PageContent>
      {/*<Footer />*/}
    </Container>
  );
};

const Observed = observer(CommissionPlanPage);

const WithStoreConnection = () => {
  const { commissionPlan } = useStore();

  const { fields, getCommissionPlan, searchTerm, setSearchTerm } = commissionPlan;
  console.log({ fields });

  React.useEffect(() => {
    getCommissionPlan();
  }, []);

  if (fields.length === 0) {
    return null;
  }

  return <Observed {...{ data: fields, searchTerm, setSearchTerm }} />;
};

export default observer(WithStoreConnection);
