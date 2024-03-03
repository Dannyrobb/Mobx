import { getItem, setItem, removeItem } from '@cellxpert/utils';
import { action, computed, makeObservable, observable } from 'mobx';

import StoreBase from './StoreBase';

import { loginAsAffiliate, setToken } from '../api/api';
import { LoginAsAffiliateResponse, UserPass } from '@cellxpert/api-types';

class AuthStore extends StoreBase {
  private authResponse: LoginAsAffiliateResponse | null = null;

  constructor() {
    super();

    makeObservable(this, {
      // Observables -
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      authResponse: observable,

      // Computeds -
      token: computed,
      isAuthenticated: computed,
      // Actions
      // XHR Actions
      login: action,
      logout: action,
    });

    // const authResponse = JSON.parse(getItem('token') ?? '') ?? null;
    const authResponseFromLocalStorage = getItem('affiliateApiToken');
    const authResponse = authResponseFromLocalStorage ? JSON.parse(authResponseFromLocalStorage) : null;

    if (authResponse) {
      this.authResponse = authResponse;
      setToken(authResponse.token);
    }
  }

  public login = async (payload: UserPass): Promise<void> => {
    try {
      const { data } = await loginAsAffiliate(payload);
      setToken(data.token);
      this.authResponse = data;
      setItem({ key: 'token', value: JSON.stringify(data) });

      this.rootStore.main.setLoading(false);
    } catch (err) {
      console.error('error', err);
      this.rootStore.main.setLoading(false);
    }
  };

  public logout = (): void => {
    this.authResponse = null;
    setToken('');

    removeItem('token');
  };

  get token(): string | null {
    return this.authResponse?.token ?? null;
  }

  get isAuthenticated(): boolean {
    return Boolean(this.token);
  }
}

export default AuthStore;
