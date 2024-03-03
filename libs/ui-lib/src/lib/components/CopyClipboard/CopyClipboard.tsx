import * as React from 'react';
import styled from '@emotion/styled';
import { ChevronDownIcon, CopyIcon } from '@cellxpert/icons';
import { theme } from '@cellxpert/theme';
import Tooltip from '../Tooltip/Tooltip';

export interface CopyClipboardProps {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  withButton?: boolean;
  readOnly?: boolean;
}

const ComponentWrapper = styled('div')(() => ({
  display: 'flex',
}));

const InputButtonWrapper = styled('div')(() => ({
  display: 'flex',
  flex: 1,
  position: 'relative',
}));

const CopyButton = styled('button')(() => ({
  borderWidth: 0,
  borderRadius: `0 50% 50% 0`,
  padding: `${theme.gutters.base - 1}px ${theme.gutters.base + 4}px ${theme.gutters.base - 2}px ${
    theme.gutters.base
  }px`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.additional.grey[300],
  },
  '&:active': {
    backgroundColor: theme.palette.additional.grey[500],
  },
}));

const CopyInput = styled('input')<Pick<CopyClipboardProps, 'withButton'>>(({ withButton }) => ({
  ...theme.typography.meta.body2,
  width: '100%',
  color: theme.palette.text.main,
  backgroundColor: theme.palette.blacks.white,
  border: `1px solid ${theme.palette.blacks.border}`,
  padding: `${theme.gutters.base - 1}px ${theme.gutters.base}px ${theme.gutters.base - 1}px ${
    theme.gutters.base * 2
  }px`,
  borderRadius: `16px 0 0 16px`,
  '&:read-only': {
    backgroundColor: theme.palette.additional.grey[100],
  },
  ...(withButton && {
    borderRadius: 0,
  }),
}));

const ExpandedData = styled('div')<{ isExpanded: boolean }>(({ isExpanded }) => ({
  fontFamily: "'Lato', sans-serif",
  fontSize: 10,
  letterSpacing: 0.3,
  lineHeight: 1.5,
  position: 'absolute',
  width: '100%',
  top: 32,
  maxHeight: 130,
  display: 'none',
  backgroundColor: theme.palette.blacks.white,
  border: `1px solid ${theme.palette.blacks.border}`,
  borderTop: 0,
  padding: `${theme.gutters.base}px ${theme.gutters.base * 2}px `,
  ...(isExpanded && {
    display: 'block',
  }),
}));

const ExpandDataButton = styled('button')(({}) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.additional.grey[100],
  border: `1px solid ${theme.palette.blacks.border}`,
  borderRight: 0,
  padding: 7,
  paddingBottom: 4,
  '&:hover': {
    backgroundColor: theme.palette.additional.grey[300],
  },
  '&:active': {
    backgroundColor: theme.palette.additional.grey[500],
  },
}));
const CopiedTooltipWrapper = styled('div')(({}) => ({
  paddingBottom: 10,
}));
const CopiedTooltip = styled('div')(() => ({
  ...theme.typography.meta.body2,
  backgroundColor: theme.palette.text.main,
  color: theme.palette.text.contrast,
  padding: `4px ${theme.gutters.base * 2}px`,
  ':after': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: 0,
    borderWidth: '5',
    borderStyle: 'solid',
    borderColor: `${theme.palette.text.main} transparent transparent transparent`,
    top: 24,
    left: 37,
  },
}));

export const CopyClipboard: React.FunctionComponent<CopyClipboardProps> = ({
  value,
  onChange,
  readOnly,
  withButton,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(value)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ComponentWrapper>
      <InputButtonWrapper>
        {withButton && (
          <ExpandDataButton
            {...{
              onClick: () => {
                setIsExpanded(!isExpanded);
              },
            }}
          >
            <ChevronDownIcon {...{ color: 'main' }} />
          </ExpandDataButton>
        )}
        <CopyInput type="text" {...{ value, onChange, readOnly, withButton }} />
        <ExpandedData
          {...{
            isExpanded,
          }}
        >
          {value}
        </ExpandedData>
      </InputButtonWrapper>
      <Tooltip
        {...{
          placement: 'top',
          isOpen: isCopied,
          toggleFunc: () => {
            console.log("I'm here");
          },
          button: (
            <CopyButton {...{ onClick: () => handleCopyClick() }}>
              <CopyIcon {...{ color: 'main' }} />
            </CopyButton>
          ),
        }}
      >
        <CopiedTooltipWrapper>
          <CopiedTooltip>Copied!</CopiedTooltip>
        </CopiedTooltipWrapper>
      </Tooltip>
    </ComponentWrapper>
  );
};

export default CopyClipboard;
