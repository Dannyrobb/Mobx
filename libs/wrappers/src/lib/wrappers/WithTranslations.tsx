import * as React from 'react';
import { IntlProvider, MessageFormatElement } from 'react-intl';

export interface WithTranslationsProps {
  locale: string;
  key: string;
  messages?: Record<string, string> | Record<string, MessageFormatElement[]>;
}

export const WithTranslations: React.FunctionComponent<WithTranslationsProps> = ({ locale, messages, children }) => {
  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      {React.Children.only(children)}
    </IntlProvider>
  );
};
