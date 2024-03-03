import { CSS } from './';

export const flex: CSS = {
  display: 'flex',
};

// /**
//  * First center refers to JustifyContent
//  * Second refers to AlignItems
//  */
export const flexCenterCenter: CSS = {
  ...flex,
  justifyContent: 'center',
  alignItems: 'center',
};

export const flexCenterStretch: CSS = {
  ...flex,
  justifyContent: 'center',
};

export const flexCenterStart: CSS = {
  ...flex,
  alignItems: 'start',
  justifyContent: 'center',
};

export const flexStartCenter: CSS = {
  ...flex,
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const flexEndCenter: CSS = {
  ...flex,
  justifyContent: 'flex-end',
  alignItems: 'center',
};

export const flexBetweenCenter: CSS = {
  ...flex,
  justifyContent: 'space-between',
  alignItems: 'center',
};
