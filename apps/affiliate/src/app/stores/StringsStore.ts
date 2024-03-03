import { flattenObject } from '@cellxpert/utils';
import { computed, makeObservable } from 'mobx';
import { createIntl, createIntlCache, IntlShape } from 'react-intl';

import StoreBase from './StoreBase';

// eslint-disable-next-line import/no-unresolved
import { Messages, Strings, SupportedLocales } from '../strings';
import { english } from '../strings/strings';

const langs: Record<SupportedLocales, Strings> = {
  'en-US': english,
};

const intlCache = createIntlCache();

class StringsStore extends StoreBase {
  constructor() {
    super();
    makeObservable(this, {
      // Observables -

      // Computed -
      selectedLang: computed,
      strings: computed,
      locale: computed,
      localeISO: computed,
      // Actions
      // XHR Actions
    });
  }
  get selectedLang(): string {
    return this.rootStore.ui.lang || 'en-US';
  }

  get strings(): Strings {
    return langs[this.locale];
  }

  get messages(): Messages {
    return flattenObject(this.strings);
  }

  get locale(): SupportedLocales {
    const locale = this.selectedLang;

    if (!locale) {
      return 'en-US';
    }

    const normalisedLocale: SupportedLocales = locale.replace('_', '-') as SupportedLocales;

    if (locale && !langs[normalisedLocale]) {
      return 'en-US';
    }

    return normalisedLocale;
  }

  get intl(): IntlShape {
    return createIntl(
      {
        locale: this.locale,
        messages: this.messages,
      },
      intlCache
    );
  }

  get localeISO(): string {
    return this.locale.split('-')[0];
  }
}

export default StringsStore;
