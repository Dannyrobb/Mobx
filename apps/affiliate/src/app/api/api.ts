import type { AcceptedMimeType } from '@cellxpert/ui-lib';
import axios, { AxiosResponse } from 'axios';
import {
  AccountDetailsSection,
  CustomerProfilePermissionsResponse,
  GetAccountDetailsResponse,
  GetActivityReportParams,
  GetActivityReportResponse,
  GetAffiliateDocumentsResponse,
  GetCommissionPlanResponse,
  GetGlobalConfigResponse,
  GetPresignedURLParams,
  GetPresignedURLResponse,
  GetRegistrationsReportParams,
  GetRegistrationsReportResponse,
  GetTransactionsReportResponse,
  GetUIConfigResponse,
  GetCustomerReportParams,
  LoginAsAffiliateResponse,
  SubmitPaymentDetailsBAResponse,
  SubmitPaymentDetailsGiResponse,
  SubmitPaymentDetailsPMResponse,
  SubmitPersonalInfoResponse,
  SubmitResetPasswordResponse,
  SubmitUploadDocumentParams,
  SubmitUploadDocumentResponse,
  UpdatePaymentDetailsPayload,
  UpdatePersonalInfoPayload,
  UploadFileResponse,
  CustomerBonusesObj,
  CustomerCommissionObj,
  UserPass,
  CustomerPositionsObj,
  WithPassword,
  UpdatePrivacySettingsPayload,
  GetComputedActivityReportResponse,
  GetComputedActivityReportParams,
  GetMarketingToolsFiltersParams,
  GetMarketingToolsFiltersResponse,
  GetMarketingToolsResponse,
  GetMarketingToolsParams,
  MediaReportResponse,
  MediaReportParams,
  GetAvailableBrandsResponse,
  GetAffiliateManagerResponse,
  GetAffiliateManagerParams,
  GetIbDashboardRegistrationsParams,
  IbDashboardRegistrationsResonse,
  GetSubAffiliateReportParams,
  GetSubAffiliateReportResponse,
  GetLeadsReportParams,
  GetLeadsReportResponse,
  GetEarningsReportParams,
  GetEarningsReportResponse,
} from '@cellxpert/api-types';
import { apiBaseUrl } from '../config/config';

const api = axios.create({
  baseURL: `${apiBaseUrl}`,
  timeout: 60 * 1000,
  headers: {
    affiliate_url: 'CellxpertNewDesign',
    'Content-Type': 'application/json',
  },
});

export const setToken = (token: string): void => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const loginAsAffiliate = async (payload: UserPass): Promise<AxiosResponse<LoginAsAffiliateResponse>> => {
  return api.post<LoginAsAffiliateResponse>('/authenticate/login-as-affiliate', {
    ...payload,
    url: 'CellxpertNewDesign',
  });
};

export const getGlobalConfig = async (): Promise<AxiosResponse<GetGlobalConfigResponse>> => {
  return api.get<GetGlobalConfigResponse>('?command=getGlobalConfigJSON');
};

export const getUiConfig = async (): Promise<AxiosResponse<GetUIConfigResponse>> => {
  return api.get<GetUIConfigResponse>('?command=getUIConfigJSON');
};

export const getCustomerProfilePermissions = async (): // params: CustomerProfileTabsPermissionsParams
Promise<AxiosResponse<CustomerProfilePermissionsResponse>> => {
  return api.get<CustomerProfilePermissionsResponse>('?command=getCustomerProfilePermissions');
};

export const submitPersonalInfo = async (): Promise<AxiosResponse<SubmitPersonalInfoResponse>> => {
  return api.post<SubmitPersonalInfoResponse>('/account/details');
};

export const submitPaymentDetailsPm = async (): Promise<AxiosResponse<SubmitPaymentDetailsPMResponse>> => {
  return api.post<SubmitPaymentDetailsPMResponse>('/account/paymentdetailspm');
};

export const submitPaymentDetailsGi = async (): Promise<AxiosResponse<SubmitPaymentDetailsGiResponse>> => {
  return api.post<SubmitPaymentDetailsGiResponse>('/account/paymentdetailsgi');
};

export const submitPaymentDetailsBa = async (): Promise<AxiosResponse<SubmitPaymentDetailsBAResponse>> => {
  return api.post<SubmitPaymentDetailsBAResponse>('/account/paymentdetailsba');
};

export const submitResetPassword = async (): Promise<AxiosResponse<SubmitResetPasswordResponse>> => {
  return api.post<SubmitResetPasswordResponse>('/account/resetpassword');
};

export const getPresignedUrl = async (
  params: GetPresignedURLParams
): Promise<AxiosResponse<GetPresignedURLResponse>> => {
  return api.get<GetPresignedURLResponse>('?command=getPresignedUrl', { params });
};

export const uploadFile = async ({
  path,
  file,
}: {
  file: File;
  path: string;
  type: AcceptedMimeType;
}): Promise<AxiosResponse<UploadFileResponse>> => {
  return axios.put<UploadFileResponse>(path, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};

export const updatePersonalInfo = async (
  payload: UpdatePersonalInfoPayload
): Promise<AxiosResponse<UploadFileResponse>> => {
  return api.post<UploadFileResponse>(
    '?command=UpdateAccountDetailsJSON',
    { ...payload, section: 'PersonalDetails', passwordVerify: 'asd1234' },
    {}
  );
};

export const updatePaymentDetails = async (
  payload: WithPassword<UpdatePaymentDetailsPayload>
): Promise<AxiosResponse<UploadFileResponse>> => {
  return api.post<UploadFileResponse>(
    '?command=UpdateAccountDetailsJSON',
    { ...payload, section: 'PaymentInformation' },
    {
      headers: { 'Content-Type': 'application/json' },
      url: 'CellxpertNewDesign',
    }
  );
};

export const updateAccountDetails = async ({
  payload,
  password = 'asd1234',
}: // section,
{
  payload: UpdatePersonalInfoPayload | UpdatePaymentDetailsPayload;
  password: string;
  section: AccountDetailsSection;
}): Promise<AxiosResponse<UploadFileResponse>> => {
  return api.post<UploadFileResponse>(
    '?command=UpdateAccountDetailsJSON',
    { ...payload, section: 'PersonalDetails', passwordVerify: password },
    {}
  );
};
export const updatedPrivacyEnforced = async (
  payload: UpdatePrivacySettingsPayload
): Promise<AxiosResponse<UploadFileResponse>> => {
  console.log('updated Enforced');
  return api.post<UploadFileResponse>('?command=UpdateAccountDetailsJSON', { ...payload, section: 'consent' });
};

export const updatePrivacySettings = async (
  payload: WithPassword<UpdatePrivacySettingsPayload>
): Promise<AxiosResponse<UploadFileResponse>> => {
  return api.post<UploadFileResponse>(
    '?command=UpdateAccountDetailsJSON',
    {
      ...payload,
      section: 'consent',
    },
    {
      headers: { 'Content-Type': 'application/json' },
      url: 'CellxpertNewDesign',
    }
  );
};

export const deleteAccount = async (
  payload: WithPassword<UpdatePrivacySettingsPayload>
): Promise<AxiosResponse<UploadFileResponse>> => {
  return api.post<UploadFileResponse>(
    '?command=UpdateDeleteAccountDetailsJSON',
    {
      ...payload,
      section: 'consent',
    },
    {
      headers: { 'Content-Type': 'application/json' },
      url: 'CellxpertNewDesign',
    }
  );
};

export const getAccountDetails = async (): Promise<AxiosResponse<GetAccountDetailsResponse>> => {
  return api.get<GetAccountDetailsResponse>('?command=accountDetailsJSON');
};

export const getAffiliateDocuments = async (): Promise<AxiosResponse<GetAffiliateDocumentsResponse>> => {
  return api.get<GetAffiliateDocumentsResponse>('?command=getAffiliateDocuments', {
    params: {
      json: 1,
    },
  });
};

export const submitUploadedDocument = async ({
  fileUrl,
  documentKey,
}: SubmitUploadDocumentParams): Promise<AxiosResponse<SubmitUploadDocumentResponse>> => {
  return api.get<SubmitUploadDocumentResponse>('?command=uploadS3Document', {
    params: {
      documentKey,
      fileUrl,
    },
  });
};

export const getRegistrationsReport = async (
  params: GetRegistrationsReportParams
): Promise<AxiosResponse<GetRegistrationsReportResponse>> => {
  return api.get<GetRegistrationsReportResponse>('?command=processregreport', { params });
};

export const getSubAffiliateReport = async (
  params: GetSubAffiliateReportParams
): Promise<AxiosResponse<GetSubAffiliateReportResponse>> => {
  return api.get<GetSubAffiliateReportResponse>('?command=subaffiliatesjson', { params });
};

export const getCustomerPositions = async (
  params: GetCustomerReportParams
): Promise<AxiosResponse<CustomerPositionsObj[]>> => {
  console.log('hereee');

  return api.get<CustomerPositionsObj[]>('?command=getUserPositions', { params });
};

export const getCustomerOpenPositions = async (
  params: GetCustomerReportParams
): Promise<AxiosResponse<CustomerPositionsObj[]>> => {
  return api.get<CustomerPositionsObj[]>('?command=getUserOpenPositions', { params });
};

export const getCustomerTransactions = async (
  params: GetCustomerReportParams
): Promise<AxiosResponse<GetTransactionsReportResponse>> => {
  return api.get<GetTransactionsReportResponse>('?command=getUserTransactions', { params });
};

export const getCustomerBonuses = async (
  params: GetCustomerReportParams
): Promise<AxiosResponse<CustomerBonusesObj[]>> => {
  return api.get<CustomerBonusesObj[]>('?command=getUserBonuses', { params });
};

export const getCustomerCommissions = async (
  params: GetCustomerReportParams
): Promise<AxiosResponse<CustomerCommissionObj[]>> => {
  return api.get<CustomerCommissionObj[]>('?command=getUserCommissions', { params });
};

export const getLeadsReport = async (
  params: GetLeadsReportParams
): Promise<AxiosResponse<GetLeadsReportResponse>> => {
  return api.get<GetLeadsReportResponse>('?command=processleadsreport', { params });
};

export const getEarningsReport = async (
  params: GetEarningsReportParams
): Promise<AxiosResponse<GetEarningsReportResponse>> => {
  return api.get<GetEarningsReportResponse>('?command=earningsjson', { params });
};

export const getActivityReport = async (
  params: GetActivityReportParams
): Promise<AxiosResponse<GetActivityReportResponse>> => {
  return api.get<GetActivityReportResponse>('?command=processActivityReport', { params });
};
export const getComputedActivityReport = async (
  params: GetComputedActivityReportParams
): Promise<AxiosResponse<GetComputedActivityReportResponse>> => {
  return api.get<GetComputedActivityReportResponse>('?command=getActivity', { params });
};

export const getCommissionPlan = async (): Promise<AxiosResponse<GetCommissionPlanResponse>> => {
  return api.get<GetCommissionPlanResponse>('?command=commissionPlan');
};

export const getMarketingToolsFilters = async (
  params: GetMarketingToolsFiltersParams
): Promise<AxiosResponse<GetMarketingToolsFiltersResponse>> => {
  return api.get<GetMarketingToolsFiltersResponse>('?command=marketingToolsFilters', { params });
};

export const getMarketingTools = async (
  params: GetMarketingToolsParams
): Promise<AxiosResponse<GetMarketingToolsResponse>> => {
  return api.get<GetMarketingToolsResponse>('?command=listMediaJSON', { params });
};

export const getMediaReport = async (params: MediaReportParams): Promise<AxiosResponse<MediaReportResponse>> => {
  return api.get<MediaReportResponse>('?command=processReport', { params });
};

export const getAvailableBrands = async (): Promise<AxiosResponse<GetAvailableBrandsResponse>> => {
  return api.get<GetAvailableBrandsResponse>('?command=getAvailableBrandsJSON');
};

export const getAffiliateManagerData = async (
  params: GetAffiliateManagerParams
): Promise<AxiosResponse<GetAffiliateManagerResponse>> => {
  return api.get<GetAffiliateManagerResponse>('?command=AffiliateManagerData', { params });
};

export const getIbDashboardRegistrations = async (
  params: GetIbDashboardRegistrationsParams
): Promise<AxiosResponse<IbDashboardRegistrationsResonse>> => {
  return api.get<IbDashboardRegistrationsResonse>('?command=ibdashboardregistrations', { params });
};
