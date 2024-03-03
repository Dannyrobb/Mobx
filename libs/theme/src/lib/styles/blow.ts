import { CSS } from './';
//
export const blow: CSS = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const absoluteBlow: CSS = {
  ...blow,
  position: 'absolute',
};

export const fixedBlow: CSS = {
  ...blow,
  position: 'fixed',
};
