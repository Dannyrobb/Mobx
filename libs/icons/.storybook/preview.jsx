import React from 'react';
import { WithAllStorybookWrappers } from '@cellxpert/wrappers';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

export const decorators = [
  (Story) => (
    <WithAllStorybookWrappers>
      <Story />
    </WithAllStorybookWrappers>
  ),
];

const newViewports = {
  iphone678: {
    name: 'iPhone 6/7/8',
    styles: {
      width: '375px',
      height: '552px',
    },
  },
  iphone11: {
    name: 'iPhone 11',
    styles: {
      width: '375px',
      height: '812px',
    },
  },
};

export const parameters = {
  viewport: {
    viewports: { ...MINIMAL_VIEWPORTS, ...newViewports }, // newViewports would be an ViewportMap. (see below for examples)
    defaultViewport: 'responsive',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
};
