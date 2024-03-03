import * as React from 'react';

import Button from '../../components/Button/Button';
import Typography from '../../components/Typography/Typography';

export interface InitialProps {}

export const Initial: React.FunctionComponent<InitialProps> = () => {
  return (
    <div>
      <Typography>Foo</Typography>
      <Typography {...{ variant: 'h4' }}>Foo</Typography>
      <Typography
        {...{
          color: 'primary1',
          variant: 'h4',
          component: 'h3',
        }}
      >
        H3
      </Typography>
      <Button>Foo</Button>
    </div>
  );
};

export default Initial;
