import * as React from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@cellxpert/icons';
import { flexStartCenter, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

export interface AccordionProps {
  isOpen?: boolean;
  header: string | React.ReactNode;
  content: React.ReactNode;
}

export const Header = styled('header')(() => ({
  ...theme.typography.meta.body1,
  padding: `${theme.gutters.base}px ${theme.gutters.base * 2}px ${theme.gutters.base * 2}px ${
    theme.gutters.base * 2
  }px`,
  ...flexStartCenter,
  ' svg': {
    marginRight: `${theme.gutters.base}px`,
    color: theme.palette.text.main,
    fill: theme.palette.text.main,
  },
  ':hover': {
    backgroundColor: theme.palette.additional.grey['300'],
  },
  cursor: 'pointer',
}));

export const ContentAnimation = styled(motion.div)(() => ({
  '> div:last-child': {
    paddingBottom: `${theme.gutters.base * 4}px`,
  },
}));

export const Container = styled('div')<{
  isOpen: boolean;
}>(({ isOpen }) => ({
  backgroundColor: 'white',
  boxShadow: `0 1px 5px 0 rgba(0,0,0,0.2)`,
  marginBottom: isOpen ? theme.gutters.base * 2 : theme.gutters.base / 2,
}));

export const Accordion: React.FunctionComponent<AccordionProps> = ({ isOpen, header, content }) => {
  const [_isOpen, setIsOpen] = React.useState<boolean>(Boolean(isOpen));

  return (
    <Container isOpen={_isOpen}>
      <Header onClick={() => setIsOpen(!_isOpen)}>
        {!_isOpen && <ChevronDownIcon {...{ width: 16, height: 16 }} />}
        {_isOpen && <ChevronUpIcon {...{ width: 16, height: 16 }} />}
        {header}
      </Header>
      <AnimatePresence initial={_isOpen}>
        {_isOpen && (
          <ContentAnimation
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.0, 0.62, 0.23, 0.98] }}
          >
            {content}
          </ContentAnimation>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Accordion;
