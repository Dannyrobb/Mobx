import React from 'react';

import { Typography } from '@cellxpert/ui-lib';

export interface PageTitleProps {}

export const PageTitle: React.FunctionComponent<PageTitleProps> = ({ children }) => (
  <Typography {...{ variant: 'h5', component: 'h1', children }} />
);
