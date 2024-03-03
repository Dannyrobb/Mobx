import * as React from 'react';

import { CloseIcon, ErrorFilledIcon, InfoFilledIcon } from '@cellxpert/icons';
import { flexCenterCenter, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

import Typography from '../Typography/Typography';

export interface BannerProps {
  /**
   * Banner Variant
   * @default info
   */
  // hasSubtitle: boolean;
  variant: 'error' | 'warning' | 'success' | 'info';
  title: string;
  subtitle?: string;
  action?: {
    onClick: (e: React.MouseEvent) => void;
    text: string;
  };
}

const StyledBanner = styled('div')<{ hasSubtitle: boolean } & Pick<BannerProps, 'variant'>>(
  ({ hasSubtitle, variant }) => ({
    position: 'relative',
    ...flexCenterCenter,
    alignItems: 'center',
    backgroundColor: theme.palette.main.primary1.base,
    color: theme.palette.text.contrast,
    paddingTop: theme.gutters.base,
    paddingBottom: theme.gutters.base,
    textAlign: 'center',
    gap: theme.gutters.base,
    ...theme.typography.meta.button,
    ...(variant === 'error' && {
      backgroundColor: theme.palette.indicators.error,
    }),
    ...(variant === 'warning' && {
      backgroundColor: theme.palette.indicators.alert,
      color: theme.palette.text.main,
    }),
    ...(variant === 'success' && {
      backgroundColor: theme.palette.indicators.success,
      color: theme.palette.text.main,
    }),
    ...(hasSubtitle && {
      gap: theme.gutters.base,
    }),
  })
);

const iconMap: Record<BannerProps['variant'], React.ReactNode> = {
  error: <ErrorFilledIcon {...{ color: 'white', width: 20, height: 20 }} />,
  warning: <InfoFilledIcon {...{ color: 'main', width: 20, height: 20 }} />,
  info: <InfoFilledIcon {...{ color: 'white', width: 20, height: 20 }} />,
  success: <InfoFilledIcon />,
};

const closeIconColorMap: Record<BannerProps['variant'], React.ReactNode> = {
  error: <CloseIcon {...{ width: 20, height: 20, color: 'white' }} />,
  warning: <CloseIcon {...{ width: 20, height: 20, color: 'main' }} />,
  info: <CloseIcon {...{ width: 20, height: 20, color: 'main' }} />,
  success: <CloseIcon {...{ width: 20, height: 20, color: 'white' }} />,
};

export const IconWrap = styled('span')(() => ({
  marginRight: theme.gutters.base,
}));

export const CloseIconWrap = styled('span')(() => ({
  position: 'absolute',
  right: theme.gutters.base * 2,
}));

export const Banner: React.FunctionComponent<BannerProps> = ({ title, subtitle, variant = 'info' }) => {
  const hasSubtitle = Boolean(subtitle);
  return (
    <StyledBanner {...{ variant, hasSubtitle }}>
      <IconWrap>{iconMap[variant]}</IconWrap>
      <Typography {...{ variant: 'buttonRegular', color: 'inherit', bolder: true }}>{title}</Typography>
      <Typography {...{ variant: 'buttonRegular', color: 'inherit' }}>{subtitle}</Typography>
      {/* {action && <Button {...{ variant: 'ghost', onClick: action?.onClick }}>{action.text}</Button>}  currently not in use */}
      <CloseIconWrap>{closeIconColorMap[variant]}</CloseIconWrap>
    </StyledBanner>
  );
};

export default Banner;
