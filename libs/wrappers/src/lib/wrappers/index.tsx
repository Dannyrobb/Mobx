import React from 'react';

import { WithTheme } from './WithTheme';
import { WithMobx } from './WithMobx';
import { WithRouterForApp, WithRouterForTesting } from './WithRouter';
import { WithTranslations } from './WithTranslations';

const WithAllAppWrappers: React.FunctionComponent = ({ children }) => {
  return (
    <WithMobx>
      <WithRouterForApp>
        <WithTheme>{children}</WithTheme>
      </WithRouterForApp>
    </WithMobx>
  );
};

const WithAllStorybookWrappers: React.FunctionComponent = ({ children }) => {
  return (
    <WithTheme>
      <WithTranslations {...{ locale: 'en-US', key: 'en-US', messages: {} }}>
        <WithRouterForTesting>{children}</WithRouterForTesting>
      </WithTranslations>
    </WithTheme>
  );
};

const WithAllReactUnitTestWrappers: React.FunctionComponent = ({ children }) => {
  return (
    <WithTheme>
      <WithTranslations {...{ locale: 'en-US', key: 'en-US', messages: {} }}>
        <WithRouterForTesting>{children}</WithRouterForTesting>
      </WithTranslations>
    </WithTheme>
  );
};

export default WithAllAppWrappers;
export {
  WithTheme,
  WithMobx,
  WithAllStorybookWrappers,
  WithAllReactUnitTestWrappers,
  WithAllAppWrappers,
  WithTranslations,
};
export type { WithTranslationsProps } from './WithTranslations';
