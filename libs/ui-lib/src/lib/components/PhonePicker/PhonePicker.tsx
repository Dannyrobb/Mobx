import * as React from 'react';

import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/bootstrap.css';

// import { CloseIcon, ErrorFilled, InfoFilled } from '@cellxpert/icons';
export interface PhonePickerProps {
  /**
   * Banner Variant
   * @default info
   */
  //   // hasSubtitle: boolean;
  //   variant: 'error' | 'warning' | 'success' | 'info';
  //   title: string;
  //   subtitle?: string;
  //   action?: {
  //     onClick: (e: React.MouseEvent) => void;
  //     text: string;
  //   };
  label?: string;

  disabled?: boolean;

  loading?: boolean;

  readOnly?: boolean;
}

export const LabelWrap = styled('label')<Pick<PhonePickerProps, 'label' | 'disabled' | 'loading'>>(
  ({ label, disabled, loading }) => ({
    ...theme.typography.meta.caption,
    display: 'none',
    marginBottom: theme.gutters.base * 1,
    color: theme.palette.text.label,
    ...(label && {
      display: 'inline-block',
    }),
    ...(disabled && {
      color: theme.palette.text.disabled,
    }),
    ...(loading && {
      backgroundColor: theme.palette.additional.grey[300],
      color: theme.palette.additional.grey[300],
    }),
  })
);

const StyledPhonePicker = styled(PhoneInput)(() => ({}));

const Wrapper = styled('div')(() => ({
  '& > .foo': {
    width: theme.gutters.base * 60,
  },
  '.react-tel-input .selected-flag': {
    width: '72px',
  },
  '.react-tel-input .selected-flag .arrow': {
    display: 'inline-block',
    borderTop: 0,
    borderRight: `1px solid black`,
    borderBottom: `1px solid black`,
    borderLeft: 0,
    width: '6px',
    height: '6px',
    transform: `rotate(45deg)`,
    position: 'relative',
    top: 0,
    left: '23px',
    marginLeft: '10px',
  },
  '.react-tel-input .selected-flag .arrow.up': {
    transform: `rotate(-135deg)`,
    top: '10%',
    borderBottom: `1px solid black`,
  },
  '.react-tel-input .flag': {
    transform: `scale(1.4, 1.3)`,
  },
}));

export const PhonePicker: React.FunctionComponent<PhonePickerProps> = ({ label, disabled, loading, readOnly }) => {
  const [value, setValue] = React.useState<string>();
  return (
    <Wrapper>
      <LabelWrap {...{ label, disabled, loading }}>{label}</LabelWrap>
      <StyledPhonePicker
        value={value}
        onChange={setValue}
        placeholder="+1 (123) 123 4567"
        containerStyle={{
          ...(readOnly && {
            border: 'none',
            cursor: 'default',
            '&:focus': {
              outline: 'none',
            },
          }),
        }}
        inputStyle={{
          borderRadius: '0px',
          width: '100%',
          height: '32px',
          paddingLeft: '88px',
          fontSize: theme.typography.meta.subtitle2.fontSize,
          fontFamily: theme.typography.meta.body1.fontFamily,
          color: theme.palette.additional.grey[800],
          border: 'none',
          boxShadow: `
            -1px 0px 0px 0px ${theme.palette.blacks.border},
            1px 0px 0px 0px ${theme.palette.blacks.border},
            0px -1px 0px 0px ${theme.palette.blacks.border},
            0px 1px 0px 0px ${theme.palette.additional.grey[600]}
          `,
          ...(readOnly && {
            border: 'none',
            boxShadow: `
              -1px 0px 0px 0px ${theme.palette.blacks.white},
              1px 0px 0px 0px ${theme.palette.blacks.white},
              0px -1px 0px 0px ${theme.palette.blacks.white},
              0px 1px 0px 0px ${theme.palette.additional.grey[600]}
            `,
            cursor: 'default',
            '&:focus': {
              outline: 'none',
            },
          }),
        }}
        buttonStyle={{
          width: '72px',
          boxShadow: `1px 0px 0px 0px ${theme.palette.blacks.border}`,
        }}
        {...{ containerClass: 'foo' }}
      />
    </Wrapper>
  );
};

export default PhonePicker;
