import { TabItem, TabsProps } from '@cellxpert/ui-lib';
import { action, makeObservable, observable } from 'mobx';

import { customerProfileTabs, TabWithPermissionKey } from '../../pages/customer-profile/sections/customerProfileTabs';
import StoreBase from '../StoreBase';

class CustomerProfileStore extends StoreBase {
  public activeTabKey: string = 'overview';
  public userId: string = '';

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      activeTabKey: observable,
      userId: observable,
      // Computed -

      //Actions -
      setActiveTab: action,
      setUserId: action,
      // XHR Actions
    });
  }

  get customerProfileTabs(): TabWithPermissionKey[] {
    return customerProfileTabs(this.rootStore.i18n.intl);
  }

  get tabs(): TabsProps['tabs'] {
    return this.customerProfileTabs
      .filter((tab) => {
        return tab.permissionKey ? this.rootStore.permissions[tab.permissionKey] : true;
      })
      .map((tab) => ({
        id: tab.id,
        isDisabled: false,
        label: tab.label,
      }));
  }

  get tabContent(): TabItem['content'] {
    return this.customerProfileTabs.find((tab) => tab.id === this.activeTabKey)?.content;
  }

  public setActiveTab = (tabKey: string): void => {
    this.activeTabKey = tabKey;
  };

  public setUserId = (userId: string): void => {
    this.userId = userId;
  };
}

export default CustomerProfileStore;
