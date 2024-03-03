import * as React from 'react';

import { SearchIcon, UserAvatarIcon, CloseIcon } from '@cellxpert/icons';
import { flexStartCenter, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

import Typography from '../Typography/Typography';
import { cursorTo } from 'readline';

export interface SearchProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  clearValue?: () => void;
  placeholder?: string;
  helper?: string;
  variant?: 'regular' | 'user';
}

export const Container = styled('div')(() => ({}));

export const InputWrapper = styled('div')<Pick<SearchProps, 'variant'>>(({ variant }) => ({
  ...flexStartCenter,
  ...theme.typography.meta.body2,
  position: 'relative',
  backgroundColor: theme.palette.additional.grey['200'],
  padding: `${theme.gutters.base}px`,
  borderRadius: 40,
  gap: `${theme.gutters.base}px`,

  input: {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    margin: 0,
    display: 'block',
  },
  svg: {
    fill: theme.palette.text.placeholder,
  },
  ...(variant === 'user' && {
    background: theme.palette.blacks.background,
    border: `1px solid ${theme.palette.main.primary1.base}`,
    padding: `${theme.gutters.base * 0.628}px ${theme.gutters.base}px`,

    '>input': {
      maxWidth: 66,
      transition: '0.6s',
      '&:focus': {
        maxWidth: 240,
        paddingRight: theme.gutters.base * 4,
      },
      '&:not(:placeholder-shown)': {
        maxWidth: 240,
        paddingRight: theme.gutters.base * 4,
      },
    },
    'input::placeholder': {
      color: theme.palette.main.primary1.base,
    },
    'input:focus::placeholder': {
      color: theme.palette.text.placeholder,
    },
    svg: {
      verticalAlign: 'middle',
      fill: theme.palette.main.primary1.base,
    },
  }),
}));

const IconWrap = styled('span')<Pick<SearchProps, 'value'>>(({ value }) => ({
  position: 'absolute',
  right: 8,
  visibility: 'hidden',
  ...(value.length > 0 && {
    visibility: 'visible',
    cursor: 'pointer',
  }),
}));
const Caption = styled(Typography)(() => ({
  ...theme.typography.meta.caption,
  color: theme.palette.text.helper,
  padding: `${theme.gutters.base}px`,
}));

export const Search: React.FunctionComponent<SearchProps> = ({
  value,
  onChange,
  clearValue,
  placeholder,
  helper,
  variant,
}) => {
  return (
    <Container>
      <InputWrapper {...{ variant }}>
        {variant !== 'user' ? (
          <SearchIcon {...{ width: 16, height: 16 }} />
        ) : (
          <UserAvatarIcon {...{ width: 20, height: 20 }} />
        )}
        <input
          {...{
            type: 'text',
            placeholder,
            onChange,
            value,
            ...(variant === 'user' && {
              onFocus: (e) => (e.target.placeholder = 'Search by user ID'),
              onBlur: (e) => (e.target.placeholder = placeholder || ''),
            }),
          }}
        />
        {variant === 'user' && (
          <IconWrap {...{ value }}>
            <CloseIcon
              {...{
                onClick: () => {
                  clearValue && clearValue();
                },
                width: 16,
                height: 16,
                style: { fill: 'black' },
              }}
            />
          </IconWrap>
        )}
      </InputWrapper>
      {helper ? <Caption>{helper}</Caption> : null}
    </Container>
  );
};

export default Search;
