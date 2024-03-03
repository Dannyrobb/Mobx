import React from 'react';

import { Story, Meta } from '@storybook/react';
import { Link, LinkProps } from './Link';

export default {
  title: 'UI Lib / Link',
  component: Link,
  argTypes: {},
} as Meta;

const Template: Story<LinkProps> = (args) => (
  <>
    <Link {...args} />
  </>
);

const All: Story<LinkProps> = () => {
  return (
    <div {...{ style: { display: 'inline-grid', gap: 16, width: '100%' } }}>
      <Link
        {...{
          children: 'This is a string',
          href: 'http://example.com',
          target: '_blank',
        }}
      />
      <Link
        {...{
          arrowRight: true,
          children: 'This is a string',
          href: 'http://example.com',
          target: '_blank',
        }}
      />
      <Link
        {...{
          disabled: true,
          children: 'This is a string',
          href: 'http://example.com',
          target: '_blank',
        }}
      />
      <Link
        {...{
          arrowRight: true,
          disabled: true,
          children: 'This is a string',
          href: 'http://example.com',
          target: '_blank',
        }}
      />
    </div>
  );
};

export const all = All.bind({});

export const base = Template.bind({});
base.args = {};
