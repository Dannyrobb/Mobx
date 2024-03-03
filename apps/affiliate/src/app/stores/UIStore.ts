import { getItem } from '@cellxpert/utils';
import { action, computed, makeObservable, observable } from 'mobx';

import StoreBase from './StoreBase';

// eslint-disable-next-line import/no-unresolved
import { SupportedLocales } from '../strings';

class UIStore extends StoreBase {
  // @observable public isRTL: boolean = false;
  public lang: SupportedLocales = 'en-US';
  /**
   * Controls whether the app Drawer is open or not
   */
  public isDrawerOpen: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      lang: observable,
      isDrawerOpen: observable,

      // Computeds -
      // routes: computed,
      isRTL: computed,
      // Actions
      onLoad: action,
      setLanguage: action,
      setDrawerState: action,
      toggleDrawer: action,
      // XHR Actions
    });
  }

  // get routes(): Route[] {
  //   return [];
  // }

  get isRTL(): boolean {
    return false;
    // return isLangRTL(this.lang);
  }

  // ? Using arrow functions here is mandatory.

  public onLoad = (): void => {
    const uiConfig: string | null = getItem('uiConfig');

    if (!uiConfig) {
      return;
    }

    const { lang } = JSON.parse(uiConfig);

    this.lang = lang;
  };

  public setLanguage = (lang: SupportedLocales): void => {
    this.lang = lang;
  };

  /**
   * Sets the app Drawer's state.
   * @param {boolean} flag false will close it. true will open it.
   * @return {void}
   */
  public setDrawerState = (flag: boolean): void => {
    this.isDrawerOpen = flag;
  };

  /**
   * Toggles the app Drawer's state. No arguments
   */
  public toggleDrawer = (): void => {
    this.isDrawerOpen = !this.isDrawerOpen;
  };
}

export default UIStore;
