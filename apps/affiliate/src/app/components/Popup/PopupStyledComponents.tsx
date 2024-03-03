import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@cellxpert/theme';
import { Typography } from '@cellxpert/ui-lib';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const PopupContainer = styled('div')(() => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.blacks.background,
  padding: theme.gutters.base * 2 + 'px',
  borderRadius: theme.radius.modal + 'px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  animation: `${fadeIn} 0.3s ease-in-out`,
  maxWidth: '500px',
}));

export const CloseButton = styled('button')(() => ({
  position: 'absolute',
  top: theme.gutters.base + 'px',
  right: theme.gutters.base + 'px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: theme.typography.meta.body1.fontSize,
  color: theme.palette.text.dark,
}));

export const TabsContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.gutters.base * 2 + 'px',
}));

export const Tab = styled.button<{ active?: boolean }>((props) => ({
  backgroundColor: 'transparent',
  border: 'none',
  padding: theme.gutters.base + 'px',
  marginRight: theme.gutters.base * 2 + 'px',
  cursor: 'pointer',
  fontSize: theme.typography.meta.subtitle1.fontSize,
  fontWeight: theme.typography.meta.subtitle1.fontWeight,
  minWidth: '100px',
  color: props.active ? props.color : theme.palette.text.dark,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-' + theme.gutters.base / 4 + 'px',
    left: '0',
    width: props.active ? '100%' : '0',
    height: '3px',
    backgroundColor: props.color,
    transition: 'width 0.3s ease-in-out',
  },
  '&:hover::after': {
    width: '100%',
  },
}));

export const ContentContainer = styled('div')(() => ({
  marginBottom: theme.gutters.base * 2 + 'px',
}));

export const Label = styled('label')(() => ({
  display: 'block',
  fontSize: theme.typography.meta.subtitle1.fontSize,
  marginBottom: theme.gutters.base / 2 + 'px',
}));

export const Input = styled('input')(() => ({
  width: '100%',
  padding: theme.gutters.base + 'px',
  border: theme.border.checkbox,
  borderRadius: theme.radius.input + 'px',
  fontSize: theme.typography.meta.body1.fontSize,
  marginBottom: theme.gutters.base * 2 + 'px',
}));

export const TextArea = styled('textarea')(() => ({
  width: '100%',
  padding: theme.gutters.base + 'px',
  border: theme.border.checkbox,
  borderRadius: theme.radius.input + 'px',
  fontSize: theme.typography.meta.body1.fontSize,
  marginBottom: theme.gutters.base * 2 + 'px',
}));

export const ButtonContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.gutters.base * 2 + 'px',
}));

export const Button = styled('button')(() => ({
  backgroundColor: theme.palette.main.primary1[500],
  color: theme.palette.text.contrast,
  border: 'none',
  padding: theme.gutters.base + 'px ' + theme.gutters.base * 2 + 'px',
  borderRadius: theme.radius.button + 'px',
  cursor: 'pointer',
  fontSize: theme.typography.meta.button.fontSize,
}));

export const UploadedFileContainer = styled.div`
  border: 1px solid ${theme.palette.blacks.border};
  padding: ${theme.gutters.base}px;
  margin-bottom: ${theme.gutters.base * 2}px;
`;

export const AffiliatesInputContainer = styled.div`
  margin-bottom: ${theme.gutters.base * 2}px;
`;

export const AffiliateListItem = styled.li<{ status: string }>`
  color: ${({ status }) => (status === 'Approved' ? 'green' : status === 'Pending' ? 'grey' : 'red')};
`;
