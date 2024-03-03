import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import ClickAwayListener from '../ClickAwayListener/ClickAwayListener';
import { theme } from '@cellxpert/theme';

export interface TooltipProps {
  button: React.ReactElement;
  isOpen: boolean;
  placement?: 'right' | 'top' | 'left' | 'bottom' | 'bottom-start';
  selfClosing?: boolean;
  anchorEl?: HTMLElement;
  strategy?: 'absolute' | 'fixed';
  overflow?: boolean;
}

export const Popper = styled(motion.div)<Pick<TooltipProps, 'overflow'>>(({ overflow }) => ({
  label: 'popper',
  zIndex: theme.zIndex.tooltip,
  ...(!overflow && {
    maxHeight: theme.gutters.base * 30,
    overflowX: 'hidden',
    overflowY: 'auto',
  }),
}));

export const Tooltip: React.FunctionComponent<TooltipProps> = ({
  isOpen = false,
  button,
  children,
  selfClosing,
  strategy = 'absolute',
  placement = 'bottom-start',
  overflow = false,
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const [show, setShow] = React.useState<boolean>(isOpen);

  React.useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy,
  });

  return (
    <>
      {React.cloneElement(button, {
        ref: setReferenceElement,
        onClick: (e: React.MouseEvent) => {
          button.props.onClick && button.props.onClick();
          setShow(!show);
        },
      })}
      <AnimatePresence>
        {show && (
          <Popper
            {...{
              overflow,
              transition: { duration: 0.2 },
              initial: { opacity: 0 },
              exit: { opacity: 0 },
              animate: { opacity: 1 },
              ref: setPopperElement,
              style: { boxShadow: '0 12px 32px 0 rgba(111, 136, 142, 0.13)', ...styles['popper'] },
              ...attributes['popper'],
            }}
          >
            <ClickAwayListener
              {...{
                onClickAway: () => {
                  show && setShow(false);
                },
              }}
            >
              <div
                {...{
                  onClick: (e: any) => {
                    selfClosing && setShow(false);
                  },
                }}
              >
                {children}
              </div>
            </ClickAwayListener>
          </Popper>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tooltip;
