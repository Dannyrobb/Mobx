import * as React from 'react';
import { useState } from 'react';

import { CheckedOutlineIcon, CloseIcon, EditIcon } from '@cellxpert/icons';
import { flex, flexStartCenter, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

import NumberInput from '../NumberInput/NumberInput';

export interface EditInlineProps {
  onChange: (value: number) => void;
  value: number;
  prefix?: string;
  suffix?: string;
}

export const EditModeContainer = styled('div')(() => ({
  ...flex,
  margin: `-${theme.gutters.base}px`,
  '& input': {
    width: '93px',
  },
}));

export const ActionsContainer = styled('div')(() => ({
  ...flexStartCenter,
  'svg:first-child': {
    borderRight: `1px solid ${theme.palette.blacks.border}`,
    paddingRight: `${theme.gutters.base}px`,
    maxHeight: `${theme.gutters.base * 2}px`,
    margin: `0 ${theme.gutters.base}px`,
    width: 'auto',
  },
}));

export const Container = styled('div')(() => ({
  ' .EditIcon': {
    display: 'none',
  },
  '&:hover': {
    ' .EditIcon': {
      display: 'inline-block',
    },
  },
  ' svg': {
    cursor: 'pointer',
  },
}));

export const EditInline: React.FunctionComponent<EditInlineProps> = ({ onChange, value, prefix, suffix }) => {
  const [isEditing, toggleEditMode] = useState<boolean>(false);
  const [_value, onChangeValue] = useState<number>(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <Container>
      {!isEditing && (
        <>
          {prefix}
          {_value}
          {suffix}
          <span className="EditIcon">
            <EditIcon onClick={() => toggleEditMode(true)} />
          </span>
        </>
      )}

      {isEditing && (
        <EditModeContainer>
          <NumberInput
            value={`${_value}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChangeValue(Number(e.target.value));
            }}
          />

          <ActionsContainer>
            <CheckedOutlineIcon
              onClick={() => {
                toggleEditMode(false);
                onChangeValue(Number(_value));
                onChange(Number(_value));
              }}
              height={theme.gutters.base * 2}
              width={theme.gutters.base * 2}
            />
            <CloseIcon
              onClick={() => {
                toggleEditMode(false);
                onChangeValue(Number(value));
              }}
              height={theme.gutters.base * 2}
              width={theme.gutters.base * 2}
            />
          </ActionsContainer>
        </EditModeContainer>
      )}
    </Container>
  );
};

export default EditInline;
