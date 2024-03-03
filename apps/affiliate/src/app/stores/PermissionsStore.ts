import { computed, makeObservable } from 'mobx';

import StoreBase from './StoreBase';

import { KeyValue } from '@cellxpert/api-types';
import { extractDataType } from '../utils/convert-permission-type';

export interface PermissionItem {
  [k: string]: Record<string, unknown> | string | string[] | number | boolean;
}

class PermissionsStore extends StoreBase {
  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      // Computeds -
      permissionsPool: computed,
      shouldShowPrivacySettingsTabOnAccountDetails: computed,
      shouldShowCustomerProfileTransactions: computed,
      shouldShowCustomerProfileOpenTrades: computed,
      shouldShowCustomerProfileTrades: computed,
      shouldShowCustomerProfileBonuses: computed,
      shouldShowCustomerProfileCommissions: computed,
      shouldShowIbDashboard: computed,
      // Actions
      // XHR Actions
    });
  }

  get permissionsPool(): PermissionItem | null {
    const uiConfigResponse = this.rootStore.main.uiConfigResponse;
    const globalConfigResponse = this.rootStore.main.globalConfigResponse;
    const customerProfilePermissionsResponse = this.rootStore.main.customerProfilePermissionsResponse;

    if (!uiConfigResponse || !globalConfigResponse || !customerProfilePermissionsResponse) {
      return null;
    }

    const convertedUiConfigPermissions = uiConfigResponse.config.reduce((acc, item) => {
      return {
        ...acc,
        ...extractDataType(item),
      };
    }, {});

    const convertedCustomerProfilePermissions = Object.keys(customerProfilePermissionsResponse).reduce((acc, item) => {
      const newKey = `CustomerProfile${item.charAt(0).toUpperCase() + item.slice(1)}`;
      return {
        ...acc,
        [newKey]: customerProfilePermissionsResponse[item],
      };
    }, {});

    const permissionsFromGlobalConfig = (globalConfigResponse.globalConfig.find((item) => item.key === 'permissions')
      ?.value ?? []) as KeyValue[];

    const convertedGlobalConfigPermissions = permissionsFromGlobalConfig.reduce<PermissionItem>(
      (acc, item: { key: string; value: string }) => {
        return {
          ...acc,
          [item.key]: item.value === 'true',
        };
      },
      {}
    );

    return {
      ...convertedUiConfigPermissions,
      ...convertedGlobalConfigPermissions,
      ...convertedCustomerProfilePermissions,
    };
  }

  get shouldShowCustomerProfileTransactions(): boolean {
    if (!this.permissionsPool) {
      return false;
    }

    return Boolean(this.permissionsPool['CustomerProfileTransactions']);
  }
  get shouldShowCustomerProfileOpenTrades(): boolean {
    if (!this.permissionsPool) {
      return false;
    }

    return Boolean(this.permissionsPool['CustomerProfileOpenTrades']);
  }
  get shouldShowCustomerProfileTrades(): boolean {
    if (!this.permissionsPool) {
      return false;
    }

    return Boolean(this.permissionsPool['CustomerProfileTrades']);
  }
  get shouldShowCustomerProfileBonuses(): boolean {
    if (!this.permissionsPool) {
      return false;
    }

    return Boolean(this.permissionsPool['CustomerProfileBonuses']);
  }
  get shouldShowCustomerProfileCommissions(): boolean {
    if (!this.permissionsPool) {
      return false;
    }

    return Boolean(this.permissionsPool['CustomerProfileCommissions']);
  }

  get shouldShowPrivacySettingsTabOnAccountDetails(): boolean {
    if (!this.permissionsPool) {
      return false;
    }

    return Boolean(this.permissionsPool['EnforceGDPRPolicy']);
  }

  get shouldShowDocumentsTabOnAccountDetails(): boolean {
    if (!this.permissionsPool) {
      return false;
    }
    return Boolean(this.permissionsPool['EnableKycForAffiliates']);
  }
  get shouldShowIbDashboard(): boolean | null {
    // null added to distinguish between not set and disabled and prevent wrong view rendering
    if (!this.permissionsPool) {
      return null;
    }
    return Boolean(this.permissionsPool['EnableIbDashboard']);
  }
}

export default PermissionsStore;
