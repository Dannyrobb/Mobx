import * as React from 'react';

import {
  InfoWhiteFilledIcon,
  ErrorWhiteFilledIcon,
  CheckMarkWhiteFilledIcon,
  WarningBlackFilledIcon,
  CloseIcon,
} from '@cellxpert/icons';
import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface ToastProps {
  /**
   * What position it should be?
   * @default topRight,
   */
  position?: 'topRight' | 'bottonRight' | 'bottonLeft' | 'topLeft' | 'noAnimation';

  title?: string;

  message?: string;

  information?: boolean;

  success?: boolean;

  warning?: boolean;

  error?: boolean;

  onClick?: (e: React.MouseEvent) => void;
}

export const NotificationToast = styled('div')<
  Pick<ToastProps, 'position' | 'success' | 'warning' | 'error' | 'information'>
>(({ position = 'topRight', success, warning, error, information }) => ({
  boxSizing: 'border-box',
  zIndex: theme.zIndex.tooltip,
  ...(success && {
    backgroundColor: theme.palette.additional.green[50],
    borderLeft: `3px solid ${theme.palette.additional.green[300]}`,
  }),
  ...(warning && {
    backgroundColor: theme.palette.main.secondary2[50],
    borderLeft: `3px solid ${theme.palette.indicators.alert}`,
  }),
  ...(error && {
    backgroundColor: theme.palette.additional.red[50],
    borderLeft: `3px solid ${theme.palette.additional.red[500]}`,
  }),
  ...(information && {
    backgroundColor: theme.palette.main.primary1[50],
    borderLeft: `3px solid ${theme.palette.main.primary1[500]}`,
  }),
  ...(position === 'noAnimation' && {
    position: 'relative',
  }),
  ...(position === 'topRight' && {
    position: 'fixed',
    top: '12px',
    right: '12px',
    transition: `transform .6s ease-in-out`,
    animation: `toast-in-right .7s`,
    '@keyframes toast-in-right': {
      from: {
        transform: 'translateX(100%)',
      },
      to: {
        transform: 'translateX(0)',
      },
    },
  }),
  ...(position === 'bottonRight' && {
    position: 'fixed',
    bottom: '12px',
    right: '12px',
    transition: `transform .6s ease-in-out`,
    animation: `toast-in-right .7s`,
    '@keyframes toast-in-right': {
      from: {
        transform: 'translateX(100%)',
      },
      to: {
        transform: 'translateX(0)',
      },
    },
  }),
  ...(position === 'bottonLeft' && {
    position: 'fixed',
    bottom: '12px',
    left: '12px',
    transition: `transform .6s ease-in`,
    animation: `toast-in-left .7s`,
    '@keyframes toast-in-left': {
      from: {
        transform: 'translateX(-100%)',
      },
      to: {
        transform: 'translateX(0)',
      },
    },
  }),
  ...(position === 'topLeft' && {
    position: 'fixed',
    top: '12px',
    left: '12px',
    transition: `transform .6s ease-in`,
    animation: `toast-in-left .7s`,
    '@keyframes toast-in-left': {
      from: {
        transform: 'translateX(-100%)',
      },
      to: {
        transform: 'translateX(0)',
      },
    },
  }),
  pointerEvents: 'auto',
  boxShadow: ` 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14)`,
  maxHeight: theme.gutters.base * 10.625,
  padding: `${theme.gutters.base * 2}px ${theme.gutters.base * 2}px ${theme.gutters.base * 2}px ${
    theme.gutters.base * 2
  }px`,
}));

export const ToastButton = styled(CloseIcon)(() => ({
  position: 'relative',
  float: 'right',
  padding: 0,
  cursor: 'pointer',
}));

export const NotificationIcon = styled('div')(() => ({
  float: 'left',
}));

export const NotificationTitle = styled('p')(() => ({
  color: theme.palette.text.main,
  ...theme.typography.meta.body2,
  height: theme.gutters.base * 2,
  width: theme.gutters.base * 23,
  fontWeight: 700,
  margin: `${theme.gutters.base * 2}px ${theme.gutters.base * 4.5}px 1px ${theme.gutters.base * 4.125}px`,
  marginTop: 0,
  marginBottom: '1px',
  overflowWrap: 'break-word',
}));

export const NotificationMessage = styled('p')(() => ({
  color: theme.palette.text.main,
  ...theme.typography.meta.body2,
  margin: `0px ${theme.gutters.base * 4.5}px 0px ${theme.gutters.base * 4.125}px`,
  overflowWrap: 'break-word',
}));

export const Toast: React.FunctionComponent<ToastProps> = ({
  position,
  title,
  message,
  information,
  success,
  warning,
  error,
  onClick,
}) => {
  return (
    <NotificationToast {...{ position, success, warning, error, information }}>
      <ToastButton {...{ onClick, height: 20, width: 20, color: 'main' }} />
      <NotificationIcon>
        {information ? (
          <InfoWhiteFilledIcon {...{ color: 'information', height: 18, width: 18 }} />
        ) : success ? (
          <CheckMarkWhiteFilledIcon {...{ color: 'success', height: 18, width: 18 }} />
        ) : warning ? (
          <WarningBlackFilledIcon {...{ color: 'alert', height: 18, width: 18 }} />
        ) : error ? (
          <ErrorWhiteFilledIcon {...{ color: 'error', height: 18, width: 18 }} />
        ) : null}
      </NotificationIcon>
      <div>
        <NotificationTitle>{title}</NotificationTitle>
        <NotificationMessage>{message}</NotificationMessage>
      </div>
    </NotificationToast>
  );
};

export default Toast;
