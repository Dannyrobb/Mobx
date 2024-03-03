import * as React from 'react';

import { CheckMarkIcon, DraggableIcon, CloseIcon } from '@cellxpert/icons';
import { Theme, flexCenterCenter, theme } from '@cellxpert/theme';
import { AdditionalPaletteKey, MainPaletteKey, PaletteShades } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface TagProps {
  label: string;
  withIcon?: boolean;
  svgIcon?: React.ReactNode;
  isRemovable?: boolean;
  isDraggable?: boolean;
  color: AdditionalPaletteKey | MainPaletteKey;
  onClick?: React.MouseEvent;
}

const TagWrapper = styled('span')<{
  theme?: Theme;
  color: TagProps['color'];
}>(({ color }) => {
  const colors = getColors()(color);
  return () => ({
    ...theme.typography.meta.caption,
    ...flexCenterCenter,
    borderRadius: theme.radius.tag,
    color: colors.color,
    backgroundColor: colors.backgroundColor,
    padding: `${theme.gutters.base / 2 + 'px'} ${theme.gutters.base + 'px'}`,
    width: 'max-content',
  });
});

const colorMap: Record<TagProps['color'], { text: PaletteShades; background: PaletteShades; hover: PaletteShades }> = {
  primary1: { text: 900, background: 100, hover: 300 },
  primary2: { text: 600, background: 100, hover: 200 },
  secondary1: { text: 700, background: 50, hover: 200 },
  secondary2: { text: 800, background: 100, hover: 200 },
  magenta: { text: 600, background: 100, hover: 200 },
  brown: { text: 800, background: 100, hover: 200 },
  grey: { text: 800, background: 300, hover: 400 },
  green: { text: 600, background: 50, hover: 200 },
  red: { text: 600, background: 100, hover: 200 },
  teal: { text: 800, background: 100, hover: 200 },
};

const getColors =
  () =>
  (color: TagProps['color']): { color: string; backgroundColor: string; hover: string } => {
    const colors = colorMap[color];

    const colorFamily = color in theme.palette.main ? 'main' : 'additional';
    const palette = theme.palette[colorFamily];

    return {
      color: palette[color as MainPaletteKey & AdditionalPaletteKey][colors.text],
      backgroundColor: palette[color as MainPaletteKey & AdditionalPaletteKey][colors.background],
      hover: palette[color as MainPaletteKey & AdditionalPaletteKey][colors.hover],
    };
  };

const StyledIconWrapper = styled('div')<{ theme?: Theme; color: TagProps['color'] } & Pick<TagProps, 'isRemovable'>>(
  ({ color, isRemovable }) => {
    const colors = getColors()(color);
    console.log({ colors });
    return () => ({
      // padding: theme.gutters.base * 0.25,
      ...flexCenterCenter,
      ...(isRemovable && {
        marginLeft: theme.gutters.base / 2,
        borderRadius: theme.gutters.base * 6.25,
        display: 'flex',
        ':hover': {
          backgroundColor: colors.hover,
        },
      }),
    });
  }
);

export const Tag: React.FunctionComponent<TagProps> = ({
  label,
  color,
  isRemovable,
  isDraggable,
  withIcon,
  svgIcon,
}) => {
  return (
    <TagWrapper {...{ color }}>
      {isDraggable && (
        <StyledIconWrapper {...{ isDraggable, color }}>
          <DraggableIcon {...{ color: color }} />
        </StyledIconWrapper>
      )}
      {withIcon && <StyledIconWrapper {...{ withIcon, color }}>{svgIcon}</StyledIconWrapper>}
      {label}
      {isRemovable && (
        <StyledIconWrapper {...{ color, isRemovable }}>
          <CloseIcon
            {...{
              color: color,
              onClick: () => console.log('close button clicked'),
            }}
          />
        </StyledIconWrapper>
      )}
    </TagWrapper>
  );
};

export default Tag;
