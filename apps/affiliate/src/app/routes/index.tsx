import React from 'react';

import AccountDetailsPage from '../pages/account-details/AccountDetails';
import ActivityReport from '../pages/activity-report/ActivityReport';
import CommissionPlanPage from '../pages/commission-plan/CommissionPlan';
import CustomerProfile from '../pages/customer-profile/CustomerProfile';
import DashboardPage from '../pages/dashboard/DashboardPage';
import MarketingTools from '../pages/marketing-tools/MarketingTools';
import RegistrationReport from '../pages/registration-report/RegistrationReport';
import SubAffiliateLink from '../pages/sub-affiliates/SubAffiliateLink';
import SubAffiliateReport from '../pages/sub-affiliates/SubAffiliateReport';
import LeadsReport from '../pages/leads-report/LeadsReport';
import EarningReport from '../pages/earnings-report/EarningsReport';
import MediaReport from '../pages/media-report/MediaReport';

export interface Route {
  key: string;
  text: string;
  linksTo: string;
  exact?: boolean;
  public?: boolean;
  showOnMenu: boolean;
  component: React.ReactNode;
  subItems?: Route[];
}

// export type GenRoutes = (strings: StringsStore['strings']) => Route[];
// export const routes: Route[] = [
//   {
//     key: 'dashboard',
//     text: 'Dashboard',
//     exact: true,
//     linksTo: '',
//     showOnMenu: true,
//     component: <DashboardPage />,
//   },
//   {
//     key: 'accountDetails',
//     text: 'Account Details',
//     exact: true,
//     linksTo: 'account-details',
//     showOnMenu: true,
//     component: <AccountDetailsPage />,
//   },
//   ///THIS IS ONLY FOR TESTING AND CHECKING THE CUSTOMER PROFILE OVERVIEW, IS IT NOT SUPPOSED TO BE HERE
//   {
//     key: 'customerProfile',
//     text: 'Customer Profile',
//     exact: true,
//     linksTo: 'customer-profile/:customerId',
//     showOnMenu: false,
//     component: <CustomerProfile />,
//   },
//   {
//     key: 'marketingTools',
//     text: 'Marketing Tools',
//     linksTo: 'marketing',
//     showOnMenu: true,
//     exact: true,
//     component:  <div>Doesn't happen</div>,
//     subItems: [
//       {
//         key: 'all-marketing-tools',
//         text: 'All Marketing Tools',
//         linksTo: 'marketing/all',
//         showOnMenu: true,
//         exact: true,
//         component: <h1>All Marketing Tools</h1>,
//       },
//       {
//         key: 'private-marketing-tools',
//         text: 'Private Marketing Tools',
//         linksTo: 'marketing/private',
//         showOnMenu: true,
//         exact: true,
//         component: <h1>Private Marketing Tools</h1>,
//       },
//     ],
//   },
//   {
//     key: 'commissionPlan',
//     text: 'Commission plan',
//     exact: true,
//     linksTo: 'commission-plan',
//     showOnMenu: true,
//     component: <CommissionPlanPage />,
//   },
// ];

// export type GenRoutes = (strings: StringsStore['strings']) => Route[];
export const routes: Route[] = [
  {
    key: 'dashboard',
    text: 'Dashboard',
    exact: true,
    linksTo: '',
    showOnMenu: true,
    component: <DashboardPage />,
  },
  {
    key: 'marketingTools',
    text: 'Marketing Tools',
    linksTo: 'marketing',
    showOnMenu: true,
    exact: true,
    component: <div>Doesn't happen</div>,
    subItems: [
      {
        key: 'all-marketing-tools',
        text: 'All Marketing Tools',
        linksTo: 'marketing/all',
        showOnMenu: true,
        exact: true,
        component: <MarketingTools />,
      },
      {
        key: 'default-links',
        text: 'Default links',
        linksTo: 'marketing/links',
        showOnMenu: true,
        exact: true,
        component: <h1>Default Links</h1>,
      },
      {
        key: 'geo-rotation-group',
        text: 'Geo Rotation group',
        linksTo: 'marketing/geo-rotation',
        showOnMenu: true,
        exact: true,
        component: <h1>Geo rotation group</h1>,
      },
      {
        key: 'carousel-builder',
        text: 'Carousel builder',
        linksTo: 'marketing/carousel-builder',
        showOnMenu: true,
        exact: true,
        component: <h1>Carousel builder</h1>,
      },
      {
        key: 'search-box-builder',
        text: 'Search box builder',
        linksTo: 'marketing/search-box-builder',
        showOnMenu: true,
        exact: true,
        component: <h1>Search box builder</h1>,
      },
    ],
  },
  {
    key: 'reports',
    text: 'Reports',
    linksTo: 'reports',
    showOnMenu: true,
    exact: true,
    component: <div>Doesn't happen</div>,
    subItems: [
      {
        key: 'media-report',
        text: 'Media report',
        linksTo: 'reports/media',
        showOnMenu: true,
        exact: true,
        component: <MediaReport />,
      },
      {
        key: 'registration-report',
        text: 'Registration report',
        linksTo: 'reports/registration',
        showOnMenu: true,
        exact: true,
        component: <RegistrationReport />,
      },
      {
        key: 'activity-report',
        text: 'Activity report',
        linksTo: 'reports/activity',
        showOnMenu: true,
        exact: true,
        component: <ActivityReport />,
      },
      {
        key: 'lead-report',
        text: 'Lead report',
        linksTo: 'reports/lead',
        showOnMenu: true,
        exact: true,
        component: <LeadsReport />,
      },
      {
        key: 'earnings-report',
        text: 'Earnings report',
        linksTo: 'reports/earnings',
        showOnMenu: true,
        exact: true,
        component: <EarningReport />,
      },
    ],
  },
  {
    key: 'payments',
    text: 'Payments',
    exact: true,
    linksTo: 'payments',
    showOnMenu: true,
    component: <h1>Payments</h1>,
  },
  {
    key: 'postback',
    text: 'Postback',
    linksTo: 'postback',
    showOnMenu: false,
    exact: true,
    component: <div>Doesn't happen</div>,
    subItems: [
      {
        key: 'postback-setting',
        text: 'Postback setting',
        linksTo: 'postback/setting',
        showOnMenu: true,
        exact: true,
        component: <h1>Postback Setting</h1>,
      },
      {
        key: 'postback-log',
        text: 'Postback log',
        linksTo: 'postback/log',
        showOnMenu: true,
        exact: true,
        component: <h1>Postback Log</h1>,
      },
    ],
  },
  {
    key: 'subAffiliates',
    text: 'Sub Affiliates',
    linksTo: 'sub-affiliates',
    showOnMenu: false,
    exact: true,
    component: <div>Doesn't happen</div>,
    subItems: [
      {
        key: 'subAffiliateReport',
        text: 'Sub affiliate report',
        linksTo: 'sub-affiliates/report',
        showOnMenu: true,
        exact: true,
        component: <SubAffiliateReport />,
      },
      {
        key: 'subAffiliateLinks',
        text: 'Sub affiliate links',
        linksTo: 'sub-affiliates/links',
        showOnMenu: true,
        exact: true,
        component: <SubAffiliateLink />,
      },
    ],
  },
  {
    key: 'commission-plan',
    text: 'Commission plan',
    exact: true,
    linksTo: 'commission-plan',
    showOnMenu: true,
    component: <CommissionPlanPage />,
  },
  {
    key: 'userGuide',
    text: 'User Guide',
    exact: true,
    linksTo: 'user-guide',
    showOnMenu: true,
    component: <CommissionPlanPage />,
  },
  {
    key: 'store',
    text: 'Store',
    exact: true,
    linksTo: 'store',
    showOnMenu: true,
    component: <CommissionPlanPage />,
  },
  {
    key: 'customerProfile',
    text: 'Customer Profile',
    exact: true,
    linksTo: 'customer-profile/:customerId',
    showOnMenu: false,
    component: <CustomerProfile />,
  },

  {
    key: 'accountDetails',
    text: 'Account Details',
    exact: true,
    linksTo: 'account-details',
    showOnMenu: false,
    component: <AccountDetailsPage />,
  },
];
