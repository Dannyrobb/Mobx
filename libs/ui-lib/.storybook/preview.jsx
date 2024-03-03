import React from 'react';
import { WithAllStorybookWrappers, WithTheme } from '@cellxpert/wrappers';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { GlobalStyles } from '../src/lib/components/GlobalStyles/GlobalStyles';
import { MemoryRouter } from 'react-router';

export const decorators = [
  (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <WithTheme>
        {/* <WithAllStorybookWrappers> */}
        <>
          <GlobalStyles />
          <Story />
        </>
        {/* </WithAllStorybookWrappers> */}
      </WithTheme>
    </MemoryRouter>
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
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
};
