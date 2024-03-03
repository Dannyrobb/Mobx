import React from 'react';

import { StoreIcon } from '@cellxpert/icons';
import { Theme, theme } from '@cellxpert/theme';
import { Typography } from './../../';
import styled from '@emotion/styled';
import { Story, Meta } from '@storybook/react';

import { Card, CardProps, CardList } from './Card';

export default {
  title: 'UI Lib / Card',
  component: Card,
  argTypes: {},
} as Meta;

const Template: Story<CardProps> = (args) => (
  <>
    <Card {...args} />
  </>
);

const CardListKey = styled(Typography)(() => ({
  paddingTop: `${theme.gutters.base * 2}px`,
  marginBottom: `${theme.gutters.base * 2}px`,
  marginLeft: `${theme.gutters.base * 3}px`,
}));

const CardListValue = styled(Typography)(() => ({
  fontSize: 26,
  fontWeight: 400,
  lineHeight: 0.92,
  letterSpacing: 0.15,
  marginLeft: `${theme.gutters.base * 3}px`,
  marginBottom: `${theme.gutters.base * 4.625}px`,
}));

const GridList = styled('div')< Pick<CardProps, 'isList'>>(({ theme }) => ({
  width: theme.gutters.base * 72,
  height: 'min-content',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  margin: theme.gutters.base * 0.062,
  columnGap: '1px',
  rowGap: '1px',
}));

const All: Story<CardProps> = () => {
  const demoList = [
    { key: 'test1', value: '$140' },
    { key: 'test2', value: '$240' },
    { key: 'test3', value: '$340' },
    { key: 'test4', value: '$440' },
    { key: 'test5', value: '$540' },
    { key: 'test6', value: '$640' },
    { key: 'test7', value: '$740' },
    { key: 'test8', value: '$840' },
    { key: 'test9', value: '$940' },
  ];
  console.log(demoList);
  return (
    <div {...{ style: { display: 'inline-grid', gap: 16, width: '100%', marginLeft: 10, marginTop: 10 } }}>
      <Card
        {...{
          icon: <StoreIcon {...{ height: 20, width: 20, color: 'main' }} />,
          title: 'Small Card',
          children: <div>Some Content</div>,
        }}
      />
      <Card
        {...{
          icon: <StoreIcon {...{ height: 20, width: 20, color: 'main' }} />,
          title: 'Medium Card',
          mediumCard: true,
          children: <div>$56,400</div>,
        }}
      />
      <Card
        {...{
          icon: <StoreIcon {...{ height: 20, width: 20, color: 'main' }} />,
          title: 'Large Card',
          largeCard: true,
          children: <div>$56,400</div>,
        }}
      />
      <div {...{ style: { marginBottom: 900 } }}>
        {/* <Card
          {...{
            title: 'Testing List',
            icon: <StoreIcon {...{ height: 20, width: 20, color: 'main' }} />,
            isList: true,
            children: (
              <GridList>
                {demoList.map((item, key) => (
                  <Card key={key} {...{ isList: true }}>
                    <CardListKey {...{ variant: 'caption', color: 'dark' }}>{item.key}</CardListKey>
                    <CardListValue {...{ color: 'main', fontFamilyIndex: 1 }}>{item.value}</CardListValue>
                  </Card>
                ))}
              </GridList>
            ),
          }}
        /> */}
        {/* <Card
          {...{
            title: 'Testing List',
            icon: <StoreIcon {...{ height: 20, width: 20, color: 'main' }} />,
            isList: true,
          }}
        > */}
        <CardList
          {...{
            title: 'Testing List',
            icon: <StoreIcon {...{ height: 20, width: 20, color: 'main' }} />,
            isList: true,
          }}
        >
          <GridList>
            {demoList.map((item, key) => (
              <Card key={key} {...{ isList: true }}>
                <CardListKey {...{ variant: 'caption', color: 'dark' }}>{item.key}</CardListKey>
                <CardListValue {...{ color: 'main', fontFamilyIndex: 1 }}>{item.value}</CardListValue>
              </Card>
            ))}
          </GridList>
        </CardList>
      </div>
    </div>
  );
};

export const all = All.bind({});

export const base = Template.bind({});
