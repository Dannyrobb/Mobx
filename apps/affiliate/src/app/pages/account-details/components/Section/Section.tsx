import React from 'react';

import { Typography } from '@cellxpert/ui-lib';

export interface SectionProps {
  title: string;
  marginBottom?: number | string;
  marginTop?: number | string;
}

export const Section: React.FunctionComponent<SectionProps> = ({ title, marginTop, marginBottom, children }) => {
  return (
    <div>
      <Typography
        {...{
          variant: 'h6',
          color: 'main',
          fontFamilyIndex: 0,
          marginTop: marginTop,
          marginBottom: marginBottom,
        }}
      >
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default Section;
