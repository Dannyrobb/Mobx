import * as React from 'react';

import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

import { TabItem } from './Tabs';

interface TabProps extends TabItem {
  isActive: boolean;
  onSelect: (value: TabItem['id']) => void;
}

const StyledTabItem = styled('span')<{
  isActive?: boolean;
  isDisabled?: boolean;
  label?: string;
}>(({ isActive, isDisabled, label }) => ({
  boxSizing: 'border-box',
  display: 'inline-block',
  width: '100%',
  transition: 'all 0.3s ease',
  cursor: isDisabled || isActive ? 'default' : 'pointer',
  padding: `12px ${theme.gutters.base * 2}px`,
  ...theme.typography.meta.body2,
  color: isDisabled ? theme.palette.additional.grey['400'] : theme.palette.additional.grey['900'],
  // fontWeight: isActive ? 'bold' : 'normal', // not implemented anywhere in design
  whiteSpace: 'nowrap',
  userSelect: 'none',
  borderBottom: `2px solid ${
    isActive
      ? theme.palette.main.primary1['800']
      : isDisabled
      ? theme.palette.additional.grey['100']
      : theme.palette.blacks.border
  }`,
  ':hover': {
    ...(!(isDisabled || isActive) && { borderBottomColor: theme.palette.additional.grey['600'] }),
  },
  '&:after': {
    display: 'block',
    boxSizing: 'border-box',
    content: `'${label}'`,
    height: 0,
    visibility: 'hidden',
    overflow: 'hidden',
    userSelect: 'none',
    fontWeight: 'bold',
  },
}));

export const Tab: React.FunctionComponent<TabProps> = ({ isActive, isDisabled, onSelect, id, label }) => {
  return (
    <StyledTabItem
      {...{
        isActive,
        ...(typeof label === 'string' && { label }),
        isDisabled,
        onClick: () => {
          onSelect(id);
        },
      }}
    >
      {label}
    </StyledTabItem>
  );
};

export default Tab;
