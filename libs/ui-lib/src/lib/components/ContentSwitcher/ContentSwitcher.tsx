import * as React from 'react';

import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface ContentSwitcherProps {
  options: string[];
  selected?: string;
  disabled?: boolean;
  /**
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
}

const TabGroup = styled('div')<Pick<ContentSwitcherProps, 'options'>>(({ options }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${options.length}, 1fr)`,
}));

const Tab = styled('button')<
  {
    size: ContentSwitcherProps['size'];
    selected?: boolean;
    disabled?: ContentSwitcherProps['disabled'];
    index: number;
  } & Pick<ContentSwitcherProps, 'options'>
>(({ selected, size = 'medium', disabled, index, options }) => ({
  ...theme.typography.meta.body2,
  display: 'flex',
  justifyContent: 'space-between',
  padding: `${theme.gutters.base * 1.5}px 0px`,
  alignItems: 'center',
  backgroundColor: selected ? theme.palette.text.main : theme.palette.additional.grey[200],
  color: selected ? theme.palette.text.contrast : theme.palette.text.main,
  border: 'none',
  '&:hover': {
    cursor: 'pointer',
    background: selected ? theme.palette.text.main : theme.palette.additional.grey[300],
  },
  '&:focus': {
    boxShadow: selected
      ? `0px 0px 0px 1px ${theme.palette.text.contrast}, 0px 0px 0px 3px ${theme.palette.main.primary1.base}`
      : `0px 0px 0px 2px ${theme.palette.main.primary1.base}`,
    zIndex: 1,
    outline: 'none',
  },
  ':first-child': {
    borderRadius: `25px 0px 0px 25px`,
  },
  ':last-child': {
    borderRadius: `0px 25px 25px 0px`,
  },
  ...(size === 'small' && {
    padding: `${theme.gutters.base * 1}px 0px`,
  }),
  ...(size === 'large' && {
    padding: `${theme.gutters.base * 2}px 0px`,
  }),
  ...(disabled && {
    pointerEvents: 'none',
    color: theme.palette.additional.grey[400],
  }),
  '::after': {
    content: index < options.length - 1 ? '""' : 'none',
    background: selected ? theme.palette.text.main : theme.palette.additional.grey[300],
    left: '0px',
    height: size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px',
    width: '1px',
    boxSizing: 'border-box',
  },
}));

const TabLabel = styled('span')(() => ({
  padding: `0px ${theme.gutters.base * 2}px`,
}));

export const ContentSwitcher: React.FC<ContentSwitcherProps> = ({ options, selected, size = 'medium', disabled }) => {
  const [selectedContent, setSelectedContent] = React.useState(selected ? selected : options[0]);
  console.log(selectedContent);

  return (
    <>
      <TabGroup {...{ options }}>
        {options.map((item, index) => (
          <Tab
            key={item}
            {...{
              options,
              index,
              size,
              selected: selectedContent === item,
              onClick: () => setSelectedContent(item),
              disabled,
            }}
          >
            <TabLabel>{item}</TabLabel>
          </Tab>
        ))}
      </TabGroup>
    </>
  );
};

export default ContentSwitcher;
