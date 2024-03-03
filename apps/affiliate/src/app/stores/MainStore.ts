import { makeObservable, action, observable, computed } from 'mobx';

import StoreBase from './StoreBase';

import {
  CustomerProfilePermissionsResponse,
  GetAccountDetailsResponse,
  GetGlobalConfigResponse,
  GetUIConfigItem,
  GetUiConfigName,
  GetUIConfigResponse,
  GetUserDetailsResponse,
} from '@cellxpert/api-types';
import { getGlobalConfig, getUiConfig, getCustomerProfilePermissions } from '../api/api';
// import { extractDataType } from '../utils/convert-permission-type';

class MainStore extends StoreBase {
  public isLoading: boolean = false;
  public globalConfigResponse: GetGlobalConfigResponse | null = null;
  public uiConfigResponse: GetUIConfigResponse | null = null;
  public customerProfilePermissionsResponse: CustomerProfilePermissionsResponse | null = null;
  public accountPrivacyDetailsSelected: GetAccountDetailsResponse | null = null;
  public nonSumColumns: string[] = [
    'User_ID',
    'Brand',
    'Tracking_Code',
    'afp',
    'Language',
    'Type',
    'Size',
    'Name',
    'NCI',
    'Status',
    'Country',
    'generic1',
    'generic2',
    'generic3',
    'Customer_Name',
    'transaction_id',
    'created',
    'type',
    'position_id',
    'Symbol',
    'userId',
    'Affiliate ID',
    'Source',
    'AFP',
    'Lead_ID',
    'Commission_Type',
    'User_Id',
    'Day',
    'Month',
    'Year'
  ];
  private userDetailsResponse: GetUserDetailsResponse | null = null;

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      isLoading: observable,
      globalConfigResponse: observable,
      uiConfigResponse: observable,
      customerProfilePermissionsResponse: observable,
      accountPrivacyDetailsSelected: observable,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userDetailsResponse: observable,

      // Computeds -
      uiConfigByCategory: computed,
      // Actions
      start: action,
      setLoading: action,
      enforcePrivacyPolicyOrTermsAndConditionPopUp: action,
      // XHR Actions
      getGlobalConfig: action,
    });
  }

  public start = async (): Promise<void> => {
    this.setLoading(true);

    try {
      const requests = [
        this.getUIConfig(),
        this.getGlobalConfig(),
        this.getCustomerProfilePermissions(),
        this.enforcePrivacyPolicyOrTermsAndConditionPopUp(),
      ];
      await Promise.all(requests);
      console.log('This method is the begining of the app, the one that makes it all shiny');
      this.setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
      this.setLoading(false);
    }
  };

  public getUserDetails = async (): Promise<void> => {
    try {
      // const { data } = getUserDetails();
      const data: GetUserDetailsResponse = {
        name: 'Alex Raihelgaus',
      };
      this.userDetailsResponse = data;
    } catch (err) {
      console.error(err);
    }
  };

  get name(): string {
    // if (!this.userDetailsResponse) {
    //   return '';
    // }

    // return this.userDetailsResponse.name;
    return 'Alex';
  }

  public setLoading = (flag: boolean): void => {
    this.isLoading = flag;
  };

  public getGlobalConfig = async (): Promise<void> => {
    try {
      const { data } = await getGlobalConfig();
      this.globalConfigResponse = data;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    }
  };

  public getUIConfig = async (): Promise<void> => {
    try {
      const { data } = await getUiConfig();
      this.uiConfigResponse = data;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    }
  };

  get uiConfigByName(): Record<GetUiConfigName, GetUIConfigItem> | null {
    if (!this.uiConfigResponse) {
      return null;
    }

    return this.uiConfigResponse.config.reduce((acc, item) => {
      return {
        ...acc,
        [item.name]: item,
      };
    }, {} as Record<GetUiConfigName, GetUIConfigItem>);
  }

  get uiConfigByCategory(): Record<string, GetUIConfigItem[]> | null {
    if (!this.uiConfigResponse) {
      return null;
    }

    return this.uiConfigResponse.config.reduce<Record<string, GetUIConfigResponse['config']>>((acc, item) => {
      return {
        ...acc,
        [item.category]: acc[item.category] ? [...acc[item.category], item] : [item],
      };
    }, {});
  }

  public getCustomerProfilePermissions = async (): Promise<void> => {
    try {
      const { data } = await getCustomerProfilePermissions();
      this.customerProfilePermissionsResponse = data;
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error', err.message);
      } else {
        console.error(err);
      }
    }
  };

  public enforcePrivacyPolicyOrTermsAndConditionPopUp = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);
      await this.rootStore.accountDetails.getAccountDetails();
      const agreedToPrivacyPolicy =
        this.rootStore.accountDetails.accountDetailsResponse?.AccountDetails[0].AgreedToPrivacyPolicy ??
        'Privacy policy selection not ready yet';
      const agreedToTermsAndConditions =
        this.rootStore.accountDetails.accountDetailsResponse?.AccountDetails[0].AgreedToTermsAndConditions ??
        'Terms And Condition selection not ready yet';
      if ((agreedToTermsAndConditions || agreedToPrivacyPolicy) === false) {
        this.rootStore.popups.openPopup('termsAndConditionsPrivacyEnforcer', {
          onConfirm: () => {
            console.log('testing payload from store');
            try {
              console.log('Need to pass the updated values to backend');
            } catch (err) {
              console.log(err);
            }
          },
        });
      } else {
        //TODO- Implement a Welcome back popup (maybe the message one?)
        console.log('Welcomeback popup here');
      }
    } catch (error) {
      console.error('error ', error);
    }
  };
}

export default MainStore;
