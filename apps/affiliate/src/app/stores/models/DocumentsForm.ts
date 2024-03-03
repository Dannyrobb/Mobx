import { AcceptedMimeType } from '@cellxpert/ui-lib';
import { action, makeObservable } from 'mobx';

import { getAffiliateDocuments, getPresignedUrl, submitUploadedDocument, uploadFile } from '../../api/api';
import { GetAffiliateDocumentsResponse } from '@cellxpert/api-types';
import AccountDetailsStore from '../AccountDetailsStore';

import type { SetOptional } from 'type-fest';

export interface DocuemntMeta {
  documentKey: string;
  label: string;
  status: GetAffiliateDocumentsResponse['AffiliateDocuments'][0]['status'];
}

export type KycDocument = { accountType: Array<'company' | 'private'>; label: string; documentKey: string };

class PersonalInfoForm {
  store: AccountDetailsStore;

  constructor(store: AccountDetailsStore) {
    makeObservable(this, {
      // Observables
      // Computeds
      // Actions
      // XHR Actions
      uploadFile: action,
    });
    this.store = store;
  }

  get kycDocuments(): Array<KycDocument> {
    const uiConfig = this.store.rootStore.main.uiConfigResponse?.config;

    if (!uiConfig) {
      return [];
    }

    const kycDocumentsRaw = uiConfig?.find((cfg) => cfg.name === 'KycDocuments')?.data ?? '';

    return kycDocumentsRaw ? JSON.parse(kycDocumentsRaw) : [];
  }

  get documentsMeta(): Array<SetOptional<DocuemntMeta & KycDocument, 'status'>> {
    const affiliateDocumentsResponse = this.store.affiliateDocoumentsResponse;
    if (!affiliateDocumentsResponse) {
      return [];
    }

    return this.kycDocuments.map((kycDoc) => {
      const processedDoc = affiliateDocumentsResponse.AffiliateDocuments?.find(
        (doc) => doc.documentKey === kycDoc.documentKey
      );

      return {
        ...kycDoc,
        ...processedDoc,
      };
    });
  }

  public submitDocument = async (fileLink: string, key: string): Promise<void> => {
    await this.submitUploadedDocument({ fileLink, documentKey: key });
  };

  public uploadFile = async (file: File): Promise<{ url?: string }> => {
    const url = await this.getPresignedUrl(file);
    try {
      await uploadFile({
        file,
        path: url,
        type: file.type as AcceptedMimeType,
      });
      const fileLink = url.split('?')[0];

      // TODO check that `success === true`, if not` return {url: undefined};, ////not here, we haven`t access to message here

      return { url: fileLink };
    } catch (e) {
      console.log('error', e);
      return { url: undefined };
    }
  };

  private submitUploadedDocument = async ({ fileLink, documentKey }: { fileLink: string; documentKey: string }) => {
    try {
      const { data } = await submitUploadedDocument({ fileUrl: fileLink, documentKey });

      if (!data.success) {
        throw new Error('Failed');
      }
      await getAffiliateDocuments();
    } catch (e) {
      console.log('error', e);
    }
  };

  private getPresignedUrl = async (file: File) => {
    const {
      data: { url },
    } = await getPresignedUrl({
      filename: file.name,
      type: file.type,
      systemUrl: 'CellxpertNewDesign',
    });

    return url;
  };
}

export default PersonalInfoForm;
