import { extractDataType } from './convert-permission-type';

import { GetUIConfigItem } from '@cellxpert/api-types';

describe('extractDataType', () => {
  test('using "1" for boolean should convert to true', () => {
    const item: GetUIConfigItem = {
      category: 'SystemFeatures',
      data: '1',
      name: 'ClientSidePixelsEnabled',
      type: 'Boolean',
    };

    const output = extractDataType(item);

    expect(output).toEqual({
      ClientSidePixelsEnabled: true,
    });
  });

  test('using "0" for boolean should convert to false', () => {
    const item: GetUIConfigItem = {
      category: 'SystemFeatures',
      data: '0',
      name: 'ClientSidePixelsEnabled',
      type: 'Boolean',
    };

    const output = extractDataType(item);

    expect(output).toEqual({
      ClientSidePixelsEnabled: false,
    });
  });

  test('using "True" for boolean should convert to true', () => {
    const item: GetUIConfigItem = {
      category: 'SystemFeatures',
      data: 'True',
      name: 'ClientSidePixelsEnabled',
      type: 'Boolean',
    };

    const output = extractDataType(item);

    expect(output).toEqual({
      ClientSidePixelsEnabled: true,
    });
  });

  test('using "False" for boolean should convert to false', () => {
    const item: GetUIConfigItem = {
      category: 'SystemFeatures',
      data: 'False',
      name: 'ClientSidePixelsEnabled',
      type: 'Boolean',
    };

    const output = extractDataType(item);

    expect(output).toEqual({
      ClientSidePixelsEnabled: false,
    });
  });

  test('a "String" should convert to an actual string', () => {
    const item: GetUIConfigItem = {
      name: 'BillingAddress',
      category: 'SystemInfo',
      type: 'String',
      data: 'Acme Co. LTD<br>\nJason St. 6<br>\nEsh David 34333<br>',
    };
    const output = extractDataType(item);

    expect(output).toEqual({
      BillingAddress: 'Acme Co. LTD<br>\nJason St. 6<br>\nEsh David 34333<br>',
    });
  });

  test('a "string" should convert to an actual string', () => {
    const item: GetUIConfigItem = {
      name: 'BillingAddress',
      category: 'SystemInfo',
      type: 'string',
      data: 'Acme Co. LTD<br>\nJason St. 6<br>\nEsh David 34333<br>',
    };
    const output = extractDataType(item);

    expect(output).toEqual({
      BillingAddress: 'Acme Co. LTD<br>\nJason St. 6<br>\nEsh David 34333<br>',
    });
  });
  test('a "json" should convert to an actual object', () => {
    const item: GetUIConfigItem = {
      name: 'KycDocuments',
      category: 'KycModule',
      type: 'json',
      data: '[{"documentKey":"identity","label":"Proof of Identity","accountType":["private"]},{"documentKey":"residence","label":"Proof of Residence","accountType":["private"]},{"documentKey":"bank","label":"Bank Statement","accountType":["private"]},{"documentKey":"incorporation","label":"Certificate of Incorporation","accountType":["company"]},{"documentKey":"director","label":"Certificate of Director’s & Secretary","accountType":["company"]},{"documentKey":"registration","label":"Certificate of Registered Office","accountType":["company"]},{"documentKey":"standing","label":"Certificate of Good Standing","accountType":["company"]},{"documentKey":"memorandum","label":"Memorandum & Articles of Association","accountType":["company"]},{"documentKey":"practicing","label":"Practicing License or Certificate of Professional Registration","accountType":["company"]},{"documentKey":"resolution","label":"Board of Directors Resolution/Power of Attorney Prof of Representative","accountType":["company"]},{"documentKey":"shareholder_id","label":"Shareholder/Director Prof of Identity","accountType":["company"]},{"documentKey":"shareholder_residence","label":"Shareholder/Director Prof of Residence","accountType":["company"]},{"documentKey":"shareholder_bank","label":"Shareholder/Director Bank Statement","accountType":["company"]}]',
    };
    const output = extractDataType(item);

    expect(output).toEqual({
      KycDocuments: [
        { documentKey: 'identity', label: 'Proof of Identity', accountType: ['private'] },
        { documentKey: 'residence', label: 'Proof of Residence', accountType: ['private'] },
        { documentKey: 'bank', label: 'Bank Statement', accountType: ['private'] },
        { documentKey: 'incorporation', label: 'Certificate of Incorporation', accountType: ['company'] },
        { documentKey: 'director', label: 'Certificate of Director’s & Secretary', accountType: ['company'] },
        { documentKey: 'registration', label: 'Certificate of Registered Office', accountType: ['company'] },
        { documentKey: 'standing', label: 'Certificate of Good Standing', accountType: ['company'] },
        { documentKey: 'memorandum', label: 'Memorandum & Articles of Association', accountType: ['company'] },
        {
          documentKey: 'practicing',
          label: 'Practicing License or Certificate of Professional Registration',
          accountType: ['company'],
        },
        {
          documentKey: 'resolution',
          label: 'Board of Directors Resolution/Power of Attorney Prof of Representative',
          accountType: ['company'],
        },
        { documentKey: 'shareholder_id', label: 'Shareholder/Director Prof of Identity', accountType: ['company'] },
        {
          documentKey: 'shareholder_residence',
          label: 'Shareholder/Director Prof of Residence',
          accountType: ['company'],
        },
        { documentKey: 'shareholder_bank', label: 'Shareholder/Director Bank Statement', accountType: ['company'] },
      ],
    });
  });
  test('an Array should convert to an array', () => {
    const item: GetUIConfigItem = {
      name: 'AllowedPaymentMethods',
      category: 'SystemFeatures',
      type: 'Array',
      data: 'ecoPayz,Wire Transfer,PayPal,Payoneer,Bitcoin,NetTeller,Skrill,Trading Account,Yandex,QIWI,MoneyBookers,mybitwallet,WebMoney',
    };

    const output = extractDataType(item);
    expect(output).toEqual({
      AllowedPaymentMethods: [
        'ecoPayz',
        'Wire Transfer',
        'PayPal',
        'Payoneer',
        'Bitcoin',
        'NetTeller',
        'Skrill',
        'Trading Account',
        'Yandex',
        'QIWI',
        'MoneyBookers',
        'mybitwallet',
        'WebMoney',
      ],
    });
  });
});
