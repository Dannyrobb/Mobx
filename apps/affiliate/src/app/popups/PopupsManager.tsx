import React from 'react';

import { observer } from 'mobx-react';

import { PopupItem } from './index';

import { useStore } from '../stores/setupContext';

export interface PopupsManagerProps {
  popupToShow: PopupItem | null;
  hasPopup: boolean;
  popupProps?: Record<string, unknown>;
}

export const PopupsManager: React.FunctionComponent<PopupsManagerProps> = ({ popupProps, popupToShow, hasPopup }) => {
  return hasPopup ? <>{popupToShow?.content(popupProps)}</> : null;
};

const Observed = observer(PopupsManager);

const WithStoreConnection = observer(() => {
  const { popups: popupsStore } = useStore();

  const { popupToShow, hasPopup, popupProps } = popupsStore;

  return <Observed {...{ popupToShow, hasPopup, popupProps }} />;
});

export default WithStoreConnection;
