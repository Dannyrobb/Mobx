import AccountDetailsStore from './AccountDetailsStore';
import ActivityReportStore from './ActivityReportStore';
import AuthStore from './AuthStore';
import CommissionPlanStore from './CommissionPlanStore';
import CustomerProfileBonusesStore from './CustomerProfile/CustomerProfileBonusesStore';
import CustomerProfileCommissionsStore from './CustomerProfile/CustomerProfileCommissionsStore';
import CustomerProfileOpenPositionsStore from './CustomerProfile/CustomerProfileOpenPositionsStore';
import CustomerProfileOverviewStore from './CustomerProfile/CustomerProfileOverviewStore';
import CustomerProfilePositionsStore from './CustomerProfile/CustomerProfilePositionsStore';
import CustomerProfileStore from './CustomerProfile/CustomerProfileStore';
import CustomerProfileTransactionsStore from './CustomerProfile/CustomerProfileTransactionsStore';
import IbDashboardStore from './IbDashboardStore';
import MainStore from './MainStore';
import PermissionsStore from './PermissionsStore';
import PopupStore from './PopupStore';
import RegistrationReportStore from './RegistrationReportStore';
import MarketingToolsStore from './MarketingToolsStore';
import { RootStore } from './RootStore';
import StringsStore from './StringsStore';
import UIStore from './UIStore';
import SubAffiliateStore from "./SubAffiliateStore";
import LeadsReportStore from './LeadsReportStore';
import EarningsReportStore from './EarningsReportStore';
import MediaReportStore from './MediaReportStore';

export interface Stores {
  main: MainStore;
  auth: AuthStore;
  accountDetails: AccountDetailsStore;
  permissions: PermissionsStore;
  commissionPlan: CommissionPlanStore;
  i18n: StringsStore;
  ui: UIStore;
  popups: PopupStore;
  activityReport: ActivityReportStore;
  customerProfile: CustomerProfileStore;
  customerProfileOverview: CustomerProfileOverviewStore;
  customerProfileTransactions: CustomerProfileTransactionsStore;
  customerProfileOpenPositions: CustomerProfileOpenPositionsStore;
  customerProfilePositions: CustomerProfilePositionsStore;
  customerProfileBonuses: CustomerProfileBonusesStore;
  customerProfileCommissions: CustomerProfileCommissionsStore;
  registrationsReport: RegistrationReportStore;
  marketingTools: MarketingToolsStore;
  ibDashboard: IbDashboardStore;
  subAffiliate: SubAffiliateStore;
  leadsReport: LeadsReportStore;
  earningsReport: EarningsReportStore;
  mediaReport: MediaReportStore;
}

export const createStore = (): RootStore<Stores> => {
  return new RootStore<Stores>({
    main: new MainStore(),
    auth: new AuthStore(),
    accountDetails: new AccountDetailsStore(),
    permissions: new PermissionsStore(),
    commissionPlan: new CommissionPlanStore(),

    i18n: new StringsStore(),
    ui: new UIStore(),
    popups: new PopupStore(),
    activityReport: new ActivityReportStore(),
    customerProfile: new CustomerProfileStore(),
    customerProfileOverview: new CustomerProfileOverviewStore(),
    customerProfileTransactions: new CustomerProfileTransactionsStore(),
    customerProfileOpenPositions: new CustomerProfileOpenPositionsStore(),
    customerProfilePositions: new CustomerProfilePositionsStore(),
    customerProfileBonuses: new CustomerProfileBonusesStore(),
    customerProfileCommissions: new CustomerProfileCommissionsStore(),
    registrationsReport: new RegistrationReportStore(),
    marketingTools: new MarketingToolsStore(),
    ibDashboard: new IbDashboardStore(),
    subAffiliate: new SubAffiliateStore(),
    leadsReport: new LeadsReportStore(),
    earningsReport: new EarningsReportStore(),
    mediaReport: new MediaReportStore()
  });
};
