import * as React from 'react';
import { Story, Args, Meta } from '@storybook/react';

// import { Typography, SvgIcon, SVGIconProps } from '@cellxpert/ui-lib';
import { SvgIcon, SVGIconProps } from '../lib/SvgIcon/SvgIcon';
import * as icons from './';
import styled from '@emotion/styled';

export default {
  title: 'Icons / All',
  component: SvgIcon,
  argTypes: {},
} as Meta;

const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 250px))',
  gap: 32,
  justifyItems: 'center',
  alignItems: 'center',
});

const GridItem = styled('div')({
  width: 100,
  height: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

type IconEntry = {
  name: string;
  icon: (props: SVGIconProps) => JSX.Element;
};

export const IconsList = (args: Args) => {
  // TODO - Fix @ts-ignore
  // @ts-ignore
  const entries: IconEntry[] = Object.entries(icons).map(([name, icon]) => ({
    name,
    icon,
  }));

  const sortedIconsEntries: IconEntry[] = entries.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Grid>
        {sortedIconsEntries.map(({ name, icon }, i) => {
          return (
            <GridItem key={name}>
              <div>{icon(args)}</div>
              {/* <Typography {...{ variant: 'body2' }}> */}
              {name}
              {/* </Typography> */}
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};
