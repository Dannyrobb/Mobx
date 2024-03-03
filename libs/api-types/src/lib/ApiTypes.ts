export interface LoginAsAffiliateResponse {
  token: string;
}

export interface UserPass {
  user: string;
  pass: string;
}

export interface LoginAsAffiliatePayload extends UserPass {
  url: string;
}

export interface KeyValue {
  key: string;
  value: string;
}

export interface GetGlobalConfigResponse {
  globalConfig: Array<{ key: string; value: string | KeyValue[] }>;
}

export type GetUiConfigName =
  | 'ClientSidePixelsEnabled'
  | 'AllowedPaymentMethods'
  | 'enableCasinoTerminology'
  | 'AllowSwitchToOldVersion'
  | 'AllowGeoRotationGroups'
  | 'AllowCustomLandingPages'
  | 'AllowGeoRotationGroupsForAffiliates'
  | 'EnablePaymentRequests'
  | 'EnableWelcomeMessage'
  | 'EnableLeadsUpload'
  | 'ShowAccountTypeSwitch'
  | 'EnablePaymentRequestsAlternativeFlow'
  | 'EnablePaymentCurrencyForAffiliate'
  | 'PaymentCurrencies'
  | 'EnableAlternativeWelcomeMessage'
  | 'DisplayAffiliateUserGuide'
  | 'LinkToAffiliateUserGuide'
  | 'UseAffiliateApi'
  | 'EnableFixedWelcomeMessage'
  | 'DisplayAffiliateSection'
  | 'LinkAffiliateSection'
  | 'EnableWelcomeMessagePerAffiliate'
  | 'EnableFixedWelcomeMessagePerAffiliate'
  | 'DisplaySearchBoxBuilderSection'
  | 'LinkToSearchBoxBuilder'
  | 'DisplayCarouselBuilderSection'
  | 'LinkToCarouselBuilder'
  | 'EnableBillingAddressInPaymentFlow'
  | 'EnableMultiLevelSymbolLotRebate'
  | 'EnableOngoingPLRevshareByCountry'
  | 'showDefaultLinks'
  | 'ShowClickURL'
  | 'CreativeTypesWithIframePreview'
  | 'EnableLeadsPane'
  | 'AllowAffiliateToChangePersonalDetails'
  | 'AllowAffiliateToChangeCampaignDetails'
  | 'AllowAffiliateToChangePaymentInformation'
  | 'AllowAffiliateToViewPersonalDetails'
  | 'AllowAffiliateToViewCampaignDetails'
  | 'AllowAffiliateToViewPaymentInformation'
  | 'EnableSubAffiliates'
  | 'AllowCountries'
  | 'ShowEarned'
  | 'ShowAdjusted'
  | 'ShowPaid'
  | 'ShowBalance'
  | 'ShowBalanceBox'
  | 'BillingAddress'
  | 'EnableLifetimeRevsharePlans'
  | 'EnableLifetimeRevshareNetPl'
  | 'EnableLifetimeRevshareNetDeposit'
  | 'AllowAffiliatesToControlCashback'
  | 'EnableKycModule'
  | 'EnableKycForAffiliates'
  | 'KycDocuments'
  | 'EnableCustomerProfileForAffiliates'
  | 'EnableIbDashboard'
  | 'AllowDashboardContactInfoCommand'
  | 'AdServerProtocol'
  | 'EnableShortenUrl'
  | 'DefaultTermsAndConditionsURL'
  | 'DefaultPrivacyPolicyURL';

export interface CustomerProfileTabsPermissionsParams {
  affiliateId: number;
}

export interface CustomerProfilePermissionsResponse {
  [key: string]: boolean;
}

export interface SubmitPersonalInfoResponse {
  status: 'OK';
  data: [];
}

export interface GetUIConfigItem {
  name: GetUiConfigName;
  // TODO - create a string literal that holds the category names
  category: string;
  type: string;
  data: string;
}

export interface GetUIConfigResponse {
  config: GetUIConfigItem[];
}

export interface SubmitPaymentDetailsPMResponse {
  status: 'OK';
  data: [];
}

export interface SubmitPaymentDetailsGiResponse {
  status: 'OK';
  data: [];
}

export interface SubmitPaymentDetailsBAResponse {
  status: 'OK';
  data: [];
}

export interface GetUserDetailsResponse {
  name: string;
}

export interface GetPresignedURLResponse {
  url: string;
}

export interface GetPresignedURLParams {
  type: string;
  filename: string;
  systemUrl: 'CellxpertNewDesign';
}

export interface SubmitResetPasswordResponse {
  status: 'OK';
  data: [];
}

export interface UploadFileResponse {
  success: boolean;
  error: boolean;
  message: string;
  reason: string;
}

export interface UpdatePersonalInfoPayload {
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  country: string;
  skype: string;
  Telegram: string;
  state: string | null;
  city: string;
  postcode: string | null;
  phone: string;
}

export type WithPassword<T> = T & { passwordVerify: string };

export type PaymentDetailsServerKey =
  | 'PaymentMethod'
  | 'PaymentCurrency'
  | 'PaymentAddress'
  | 'IsCompany'
  | 'VATNumber'
  | 'AccountBeneficiary'
  | 'AccountNumber'
  | 'BankName'
  | 'BankBranch'
  | 'BankCountry'
  | 'BankCity'
  | 'SwiftCode'
  | 'IBANNumber'
  | 'ABANumber'
  | 'BankCorrespondent'
  | 'PayPalEmail'
  | 'MoneyBookersEmail'
  | 'EcoCardAccountNumber'
  | 'SkrillEmail'
  | 'QIWIEWalletNumber'
  | 'YandexEWalletNumber'
  | 'WebMoneyEWalletNumber'
  | 'TradingAccountId'
  | 'BitcoinWalletAddress'
  | 'mybitwalletEmail'
  | 'NetTellerEmail'
  | 'NetTellerAccountNumber'
  | 'PayoneerId'
  | 'PayoneerUsername'
  | 'ecopayzAccountName'
  | 'ecopayzAccountNumber';

export type UpdatePaymentDetailsPayload = Pick<GetAccountDetailsResponse['AccountDetails'][0], PaymentDetailsServerKey>;

export interface UpdatePrivacySettingsPayload {
  AgreedToTermsAndConditions?: boolean;
  AgreedToPrivacyPolicy?: boolean;
  AgreedToMarketingMaterial: boolean;
}

export type AccountDetailsSection =
  | 'ChangePassword'
  | 'PersonalDetails'
  | 'Settings'
  | 'Sources'
  | 'PaymentInformation'
  | 'consent';

export interface GetAccountDetailsResponse {
  AccountDetails: Array<{
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    country: string;
    state: string | null;
    city: string;
    postcode: string | null;
    phone: string;
    defaultlanguage: string;
    sitelanguage: string;
    skype: string | null;
    Telegram: string | null;
    OtherURLS: string | null;
    website: string;
    MainWebsiteName: string | null;
    SecondaryWebsiteURL: string | null;
    PaymentMethod: string;
    PaymentCurrency: string | null;
    PaymentAddress: string | null;
    VATNumber: string;
    AccountBeneficiary: string | null;
    AccountNumber: string | null;
    BankName: string | null;
    BankBranch: string | null;
    BankCountry: string | null;
    BankCity: string | null;
    SwiftCode: string | null;
    IBANNumber: string | null;
    ABANumber: string | null;
    BankCorrespondent: string | null;
    PayPalEmail: string | null;
    IsCompany: boolean;
    MoneyBookersEmail: string | null;
    NetTellerEmail: string;
    NetTellerAccountNumber: string;
    SkrillEmail: string;
    WebMoneyEWalletNumber: string | null;
    QIWIEWalletNumber: string | null;
    YandexEWalletNumber: string | null;
    TradingAccountId: string | null;
    PayoneerId: string | null;
    PayoneerUsername: string | null;
    mybitwalletEmail: string;
    ecopayzAccountName: string | null;
    ecopayzAccountNumber: string | null;
    BitcoinWalletAddress: string | null;
    AgreedToTermsAndConditions: boolean;
    TermsAgreedTimeStamp: string | null;
    TermsAgreementReference: string;
    TermsAndConditionsDocumentURL: string;
    AgreedToPrivacyPolicy: boolean;
    PrivacyPolicyAgreedTimeStamp: string | null;
    PrivacyPolicyAgreementReference: string;
    PrivacyPolicyDocumentURL: string;
    AgreedToMarketingMaterial: boolean;
    MarketingMaterialAgreedTimestamp: string | null;
    MarketingMaterialAgreementReference: string;

    // ? Need to verify -
    EcoCardAccountNumber: string | null;
  }>;
}

export interface GetAffiliateDocumentsParams {
  json: 1;
}

export interface GetAffiliateDocumentsResponse {
  AffiliateDocuments: Array<{
    id: number;
    documentKey: string;
    status: 'Pending' | 'Approved' | 'Declined';
    statusChangedBy: string | null;
    lastStatusChange: string | null;
    uploaded: string;
  }>;
}

export interface SubmitUploadDocumentParams {
  fileUrl: string;
  documentKey: string;
}

export interface SubmitUploadDocumentResponse {
  success: boolean;
  message: string;
}

export interface GetEarningsReportParams {
  startDate: string | null;
  endDate: string | null;
  "filter-earningType"?: string; 
}

export interface EarningsReportObj {
  created: string | null;
  amount: number | null;
  Commission_Type: string | null;
  User_Id: string | null;
  AFP: string | null;
}

export interface GetEarningsReportResponse {
  Earnings: Array<EarningsReportObj>;
}

export interface GetLeadsReportParams {
  startDate: string | null;
  endDate: string | null;
  Brand?: boolean; 
  TrackingCode?: boolean;
  Language?: boolean;
  Type?: boolean;
  Size?: boolean;
  Name?: boolean;
  afp?: boolean;
}

export type GetLeadsReportResponse = Array<{
  Lead_ID: string;
  Registration_Date: string;
  Source: string;
  Country: string,
  Status: string,
  Commissions: number
  Brand?: string;
  Tracking_Code?: string;
  Language?: string;
  Type?: string;
  Size?: string;
  Name?: string;
  AFP?: string | null;
}>


export interface GetRegistrationsReportParams {
  userid?: string;
  Day?: boolean;
  Brand?: boolean;
  DateFormat?: string;
  Language?: boolean;
  NCI?: boolean;
  Name?: boolean;
  Size?: boolean;
  TrackingCode?: boolean;
  Type?: boolean;
  afp?: boolean;
  daterange?:
    | ''
    | 'registrationdate'
    | 'fdd'
    | 'qualificationdate'
    | 'commission'
    | 'deposit'
    | 'withdrawal'
    | 'position_count'
    | 'open_positions';
  startDate: string | null;
  endDate: string | null;
  initial?: 1;
}

export interface RegistrationsReportObj {
  Adjustments?: number | null;
  Admin_Fee?: number | null;
  Bonus?: number | null;
  Brand?: string;
  Brokerage_Fee?: number | null;
  Commission?: number | null;
  Commission_Count?: number | null;
  Conversion_Days?: number | null;
  Country?: string | null;
  Customer_Name?: string | null;
  Deposit_Count?: number | null;
  Deposits?: number | null;
  External_FTD_Date?: string | null;
  First_Deposit?: number | null;
  First_Deposit_Date?: string | null;
  GGR?: number | null;
  Jackpot_Contribution?: number | null;
  Language?: string;
  Last_Open_Position_Date?: null;
  Lot_Amount?: number;
  Name?: string;
  NCI?: number;
  Net_Deposits?: number;
  Net_PL?: number;
  Open_Positions?: null;
  PL?: number;
  Position_Count?: number;
  Qualification_Date?: string;
  Registration_Date: string;
  Size?: string;
  Spread?: number;
  Status?: string;
  Tax?: number;
  Total_Bonus?: number;
  Tracking_Code?: string;
  Type?: string;
  User_ID: string;
  Volume?: number;
  Withdrawals?: number;
  afp?: string | null;
  generic1?: string | null;
  generic2?: string | null;
  generic3?: string | null;
}

export interface GetRegistrationsReportResponse {
  Registrations: Array<RegistrationsReportObj>;
}

export interface GetSubAffiliateReportParams {
  startDate: string | null;
  endDate: string | null;
}

export interface SubAffiliateReportObj {
    "Affiliate ID": string;
    Commission: number;
}

export interface GetSubAffiliateReportResponse {
  SubAffiliates: Array<SubAffiliateReportObj>
};

export interface GetCustomerReportParams {
  userid?: string;
  startDate?: string | null;
  endDate?: string | null;
  limit?: number;
}

export interface CustomerTransactionsObj {
  transaction_id: string;
  transaction_sum: number;
  created: string;
  type: string;
  UserId?: string;
}

export interface CustomerPositionsObj {
  UserId?: string;
  position_id: string;
  Symbol?: string;
  Volume?: number;
  created?: string;
  lot_amount?: string;
  PL?: string;
  Spread?: number;
  Open_Rate?: number;
  Close_Rate?: number;
  Direction?: string;
  Open_Date?: string;
  Close_Date?: string;
  Brokerage_fee?: string;
  Pip?: string;
  Lot_Amount?: string;
  Commission?: string;
}

export type GetTransactionsReportResponse = Array<{
  transaction_id: string;
  transaction_sum: number;
  created: string;
  type: string;
  UserId?: string;
}>;

export interface CustomerBonusesObj {
  transaction_id: string;
  bonus_amount: number;
  created: string;
  type: string;
  UserId?: string;
}

export interface CustomerCommissionObj {
  Amount: number;
  created: string;
  type: string;
}

export interface GetActivityReportParams {
  startdate?: string;
  enddate?: string;
  activitytype?: string;
  // xml?: number;
}

export type GetActivityReportResponse = Array<{
  startDate?: string;
  endDate?: string;
  activityType?: string;
  Commission?: number;
  Count: number;
  LOT?: number;
  PL?: number;
  Spread?: number;
  Symbol: string | null;
  Volume: number;
  // xml?: string;
}>;

export type GetComputedActivityReportParams = {
  startDate: string | null;
  endDate: string | null;
  Brand?: boolean;
  Language?: boolean;
  Name?: boolean;
  Size?: boolean;
  TrackingCode?: boolean;
  Type?: boolean;
  afp?: boolean;
  'filter-brand'?: string;
  'filter-language'?: string;
  'filter-name'?: string;
  'filter-size'?: string;
  'filter-trackingCode'?: string;
  'filter-type'?: string;
  'filter-userid'?: string;
};

export type GetComputedActivityReportResponse = Array<{
  Brand?: string;
  Brokerage_Fee: number;
  Commission_Count: number;
  Commissions: number;
  Deposit_Count: number;
  Deposits: number;
  Language?: string;
  Last_Open_Position_Date: null | string;
  Lot_Amount: number;
  Name?: string;
  Net_Deposits: number;
  Open_Positions: number;
  Open_Positions_Volume: number;
  PL: number;
  Position_Count: number;
  Size?: string;
  Spread: number;
  Tracking_Code?: string;
  Type?: string;
  Volume: number;
  Withdrawals: number;
  afp?: null | string;
  userId: string;
}>;

export type TierNum = 1 | 2 | 3 | 4 | 5;

export interface SingleTier {
  from: number;
  to: number;
  amount: number;
}

export interface CommissionArrayObject<T extends number | string = number> {
  name: string;
  code: string;
  amount: T extends number ? number : T extends string ? Array<string> : never;
}

export type CPAByCountryAndProduct = Record<string, Array<CommissionArrayObject>>;

export type CPAFtdTiers = Record<string, Array<SingleTier>>;

export type ActiveCPAPlan =
  | 'Fixed CPA'
  | 'Fixed CPAA'
  | 'First Deposit CPA'
  | 'FTD Tiers'
  | 'Trader Tiers'
  | 'Progressive CPA Tiers'
  | 'CPA by Product'
  | 'CPA by Country'
  | 'CPA by Instrument & Country'
  | 'CPA By Product'
  | 'FTD Revshare CPA'
  | 'CPA by Country and Product'
  | 'FTD Tiers By Country'
  | 'CPA by Tracking Code and country';

export type NumericCPAPlan = {
  ActiveCPAPlan: 'Fixed CPA' | 'Fixed CPAA' | 'First Deposit CPA';
  commissionPlan: number;
};

export type CPAByLabelAndCountry = {
  ActiveCPAPlan: 'CPA by Country and Product' | 'CPA by Tracking Code and country' | 'FTD Tiers By Country';
  commissionPlan: CPAByCountryAndProduct;
};

export type CPAByCountryOrProduct = {
  ActiveCPAPlan: 'CPA by Country' | 'CPA By Product';
  commissionPlan: Array<CommissionArrayObject>;
};

export type TiersCPA = {
  ActiveCPAPlan: 'FTD Tiers' | 'Progressive CPA Tiers' | 'Trader Tiers';
  // commissionPlan: CPAFtdTiers;
  commissionPlan: Partial<Record<`Tier${TierNum}`, SingleTier>>;
};

export type FTDRevshare = {
  ActiveCPAPlan: 'FTD Revshare CPA';
  commissionPlan: {
    FTDRevshareCPAMinimumFTD?: number;
    FTDRevshareCPAFTDMultiplier?: number;
    FTDRevshareCPACAP?: number;
  };
};

export type CPAByInstrumentAndCountry = {
  ActiveCPAPlan: 'CPA by Instrument & Country';
  commissionPlan: Array<CommissionArrayObject<string>>;
};

export type CPA =
  | NumericCPAPlan
  | CPAByLabelAndCountry
  | TiersCPA
  | FTDRevshare
  | CPAByInstrumentAndCountry
  | CPAByCountryOrProduct;

export type SelectRevShare<T extends keyof RevShare> = RevShare[T];
export type ExtractTupleKeys<T> = T extends (infer U)[] ? U : T;

export type TiersCommissionKeys = ['PLTiers', 'MonthlyNetDeposits'];
export type CountryCommissionKeys = ['NGRRevshareByCountry', 'RevshareEnabledByCountry'];
export type SymbolCommissionKeys = [
  'RevsharePerSymbol',
  'SpreadRevsharePerSymbol',
  'BrokerageFeeRevsharePerSymbol',
  'PipsPerLotRevshare'
];

export type NumberRevshareCommissionKeys = [
  'NETDEPOSITRevshare',
  'NETPLRevshare',
  'OngoingNetDepositsRevshare',
  'OngoingPLRevshare',
  'PLCommission',
  'PositionVolumeRevshare',
  'SpreadRevshare',
  'perLOTCommission'
];

export type SpecialCommissionKeys = ['MultiLevelSymbolLot'];

export type NumberSubAffiliateCommissionKeys = ['SubAffiliateCPA', 'SubAffiliateComissionCut'];

export type MultiTierSubAffiliateCommissionKeys = ['MultiTierSubaffiliates'];

export type CplCommissionKeys = ['PremiumCPLByCountry', 'CPLByCountry', 'CPIByCountry'];

export type FixedCommissionKeys = ['FlatMonthlyFee', 'Cashback', 'MinimumMonthlyGuarantee'];

export type TiersCommission = Record<TiersCommissionKeys[number], Partial<Record<`Tier${TierNum}`, SingleTier>>>;
export type CountryCommission = Record<CountryCommissionKeys[number], Array<CommissionArrayObject>>;
export type SymbolCommission = Record<
  SymbolCommissionKeys[number],
  Array<Pick<CommissionArrayObject, 'name' | 'amount'>>
>;
export type NumberRevshareCommission = Record<NumberRevshareCommissionKeys[number], number>;
export type SpecialCommission = Record<
  SpecialCommissionKeys[number],
  Partial<Record<`LOTPerSymbolLevel${TierNum}`, Array<Pick<CommissionArrayObject, 'name' | 'amount'>>>>
>;
export type RevShare = Partial<
  TiersCommission | CountryCommission | SymbolCommission | NumberRevshareCommission | SpecialCommission
>;

export type NumberSubAffiliateCommission = Record<NumberSubAffiliateCommissionKeys[number], number>;
export type MultiTierSubAffiliateCommission = Record<
  MultiTierSubAffiliateCommissionKeys[number],
  Partial<Record<`level${TierNum}`, number>>
>;

export type SubAffiliates = NumberSubAffiliateCommission | MultiTierSubAffiliateCommission;

// CplCommissionKeys

export type CPL = Partial<Record<CplCommissionKeys[number], Array<CommissionArrayObject>>>;
const c: CPL = {
  CPIByCountry: [{ amount: 34, code: '234', name: '234' }],
};

export type Fixed = Record<FixedCommissionKeys[number], number>;

export interface GetCommissionPlanResponse {
  CommissionPlans: Array<{
    brandName: string;
    SubAffiliates: SubAffiliates;
    RevShare: RevShare;
    CPA: CPA;
    // TODO - Mark, make sure it's okay was {}
    CPL: CPL | Record<string, never>;
    PremiumCPLByCountry?: Array<CommissionArrayObject>;
    CPI:
      | {
          CPIByCountry?: Array<CommissionArrayObject>;
        }
      // TODO - Mark, make sure it's okay was {}
      | Record<string, never>;
    CPM: {
      CPMCommission?: number;
    };
    CPC: {
      CPCCommission?: number;
    };
    Fixed: Fixed;
  }>;
}

export interface GetMarketingToolsFiltersParams {
  visibilityfilter: boolean;
}

export interface MarketingToolsFiltersObj {
  Brand: string;
  Enabled?: boolean;
  Language: string;
  Name: string;
  Size: string;
  Type: string;
}
export type MarketingToolsFiltersKeys = keyof MarketingToolsFiltersObj;

export interface GetMarketingToolsFiltersResponse {
  MarketingToolsFilters: MarketingToolsFiltersObj[];
}

export interface GetMarketingToolsParams {
  featured?: 0 | 1;
  limit?: number;
  private?: boolean;
  Brand?: string | string[];
  Size?: string | string[];
  Language?: string | string[];
  Type?: string | string[];
  Name?: string | string[];
  Enabled?: 0 | 1;
}

export interface MarketingToolsObj {
  Brand: string;
  ClickURL: string;
  Content: string;
  Created: string;
  Creative: string;
  ImageLink: string | null;
  PreviewHTML: string;
  Term: string;
  id: string;
  medium: string;
}

export interface GetMarketingToolsResponse {
  Creatives: MarketingToolsObj[];
}

export type MediaReportParams = {
  startDate: string | null;
  endDate: string | null;
  day?: boolean;
  DateFormat?: 'all' | 'day' | 'month' | 'year';
  trackingCode?: boolean;
  Country?: boolean;
  Brand?: boolean;
  Language?: boolean;
  Type?: boolean;
  Size?: boolean;
  Name?: boolean;
  'filter-brand'?: string;
  'filter-trackingCode'?: string;
  'filter-language'?: string;
  'filter-type'?: string;
  'filter-size'?: string;
  'filter-name'?: string;
}

export interface MediaReportObj {
  Adjustments?: number;
  Admin_Fee?: number;
  Bonus?: number;
  Brand?: string;
  CD?: number;
  CPA_Commissions?: number;
  CPL_Commissions?: number;
  CTR?: string;
  CR?: number;
  Clicks?: string;
  Commission?: number;
  Conversion_Rate?: string;
  Country?: string;
  Day: string;
  Demo?: number;
  Deposits?: string;
  Direct_Commissions?: number;
  FTD?: number;
  FirstDeposits?: number;
  GGR?: number;
  Hold?: number;
  Impressions?: string;
  Installations?: string;
  Jackpot_Contribution?: number;
  Language?: string;
  Leads?: number;
  Month?: string;
  Name?: string;
  Net_Deposits?: string;
  PL?: number;
  PositionLOT?: number;
  PositionPL?: number;
  PositionSpread?: number;
  PositionVolume?: number;
  QFTD?: number;
  Registrations?: number;
  Revshare_Commissions?: number;
  Size?: string;
  Sub_Commissions?: number;
  Tax?: number;
  Tracking_Code?: string;
  Type?: string;
  Unique_Clicks?: string;
  Unique_Demo?: number;
  Unique_Impressions?: string;
  Unique_Leads?: number;
  Unique_Pre_Reals?: number;
  Unique_Visitors?: string;
  Visitors?: string;
  Volume?: string;
  Withdrawals?: string;
  Year?: string;
  eCPA?: number;
  eCPC?: number;
  eCPL?: number;
}
export type MediaReportResponse = Array<MediaReportObj>;

export interface GetAvailableBrandsObj {
  DefaultLink: string;
  Description: string;
  id: number;
  identifier: string;
  name: string;
  showmarketingtools: 0 | 1;
}

export type GetAvailableBrandsResponse = Record<'AvailableBrands', GetAvailableBrandsObj[]>;

export interface GetAffiliateManagerParams {
  json?: 1 | 0;
}
export interface GetAffiliateManagerObj {
  FirstName: null | string;
  Lastname: null | string;
  Phone: null | string;
  Skype: null | string;
  Telegram: null | string;
  email: null | string;
  id: number;
}
export type GetAffiliateManagerResponse = Record<'AffiliateManagerData', GetAffiliateManagerObj[]>;

export interface GetIbDashboardRegistrationsParams {
  startDate: string;
  endDate: string;
  xml?: 1 | 0 | null;
  limit?: number;
  daterange?: 'fdd' | null;
}

export interface IbDashboardRegistrationsObj {
  Userid: string;
  FullName: string;
  GenericString1: string | null;
  GenericString2: string | null;
  First_Deposit: number;
  Net_Deposits: number;
  created: string;
  fdd: string | null;
}

export type IbDashboardRegistrationsResonse = {
  Registrations: IbDashboardRegistrationsObj[];
};
