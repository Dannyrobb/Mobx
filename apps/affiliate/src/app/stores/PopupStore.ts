// PopupStore.ts
import { action, computed, makeObservable, observable } from 'mobx';
import StoreBase from './StoreBase';
import { PopupId, PopupItem, popups } from '../popups';

class PopupStore extends StoreBase {
  public activePopup: PopupId | null = null;
  public popupProps: Record<string, unknown> | undefined = undefined;

  constructor() {
    super();

    makeObservable(this, {
      activePopup: observable,
      popupToShow: computed,
      setPopupProps: action,
      openPopup: action,
      closePopup: action,
      updatePopupProps: action,
    });
  }

  public setPopupProps = (props: PopupStore['popupProps']): void => {
    this.popupProps = {
      ...this.popupProps,
      ...props,
    };
  };

  public openPopup = (popupId: PopupId, props?: PopupStore['popupProps']): void => {
    this.setPopupProps(props);
    this.activePopup = popupId;
  };

  public closePopup = (): void => {
    this.popupProps = undefined;
    this.activePopup = null;
  };
  public updatePopupProps = (props: PopupStore['popupProps']): void => {
    this.popupProps = {
      ...this.popupProps,
      ...props,
    };
  };
  get hasPopup(): boolean {
    return Boolean(this.activePopup);
  }

  get popupToShow(): PopupItem | null {
    if (!this.activePopup) {
      return null;
    }
    return popups[this.activePopup];
  }
}

export default PopupStore;
