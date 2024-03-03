import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import styled from '@emotion/styled';
import { theme } from '@cellxpert/theme';

export interface ScrollAreaProps {
  content?: React.ReactNode;
  scrollbarSize?: number;
  scrollbarThumbRadius?: number;
  orientation?: 'vertical' | 'horizontal';
  dualAxis?: boolean;
}

const StyledScrollArea = styled(ScrollAreaPrimitive.Root)({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport)<Pick<ScrollAreaProps, 'scrollbarSize'>>(
  ({ scrollbarSize = 10 }) => ({
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    paddingBottom: scrollbarSize,
    paddingRight: scrollbarSize,
  })
);

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar)<Pick<ScrollAreaProps, 'scrollbarSize'>>(
  ({ scrollbarSize = 10 }) => ({
    display: 'flex',
    // ensures no selection
    userSelect: 'none',
    // disable browser handling of all panning and zooming gestures on touch devices
    touchAction: 'none',
    padding: 2,
    background: theme.palette.blacks.background,
    transition: 'background 160ms ease-out',
    '&:hover': { background: theme.palette.additional.grey[200] },
    '&[data-orientation="vertical"]': { width: scrollbarSize },
    '&[data-orientation="horizontal"]': {
      flexDirection: 'column',
      height: scrollbarSize,
    },
  })
);

const StyledThumb = styled(ScrollAreaPrimitive.Thumb)<Pick<ScrollAreaProps, 'scrollbarThumbRadius'>>(
  ({ scrollbarThumbRadius = 10 }) => ({
    flex: 1,
    background: theme.palette.text.light,
    borderRadius: scrollbarThumbRadius,
    // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      minWidth: 44,
      minHeight: 44,
    },
  })
);

const StyledCorner = styled(ScrollAreaPrimitive.Corner)();

export const ScrollArea: React.FunctionComponent<ScrollAreaProps> = ({
  content,
  orientation = 'vertical',
  dualAxis = false,
}) => {
  return (
    <StyledScrollArea>
      <StyledViewport>{content}</StyledViewport>
      {dualAxis ? (
        <>
          <StyledScrollbar orientation="vertical">
            <StyledThumb />
          </StyledScrollbar>
          <StyledScrollbar orientation="horizontal">
            <StyledThumb />
          </StyledScrollbar>
        </>
      ) : (
        <StyledScrollbar orientation={orientation}>
          <StyledThumb />
        </StyledScrollbar>
      )}
      <StyledCorner asChild={dualAxis ? false : true} />
    </StyledScrollArea>
  );
};

export default ScrollArea;
