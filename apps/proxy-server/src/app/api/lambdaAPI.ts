import axios from 'axios';
import { Request, Response } from 'express';
const apiBaseURL = 'https://dev-affiliateapi.cellxpert.com';

export const api = axios.create({
  baseURL: `${apiBaseURL}`,
  timeout: 60 * 1000,
  headers: {
    affiliate_url: 'CellxpertNewDesign',
    'Content-Type': 'application/json',
  },
});

export const setHeaders = ({ authorization, affiliate_url }: { authorization: string; affiliate_url: string }) => {
  api.defaults.headers.common.Authorization = authorization;
  api.defaults.headers.common.affiliate_url = affiliate_url;
};

export interface RequestHeaders {
  Authorization: string;
  affiliate_url: string;
}

export const asyncGetRequest = async (req: Request, res: Response) => {
  const {
    query: { command, ...params },
  } = req;

  console.log('params:', params);

  const { data } = await api.get<any>(`/`, { params: { command: command, ...params } });

  return res.send(data);
};

export const asyncPostRequest = async (req: Request, res: Response) => {
  const {
    query: { command },
  } = req;

  console.log('command:', command);

  console.log('req', command, req.body);

  const { data } = await api.post('/?command=' + command, req.body);
  res.send(data);
};

export const postLoginAsAffiliate = async (req: Request, res: Response) => {
  const {
    body: { user, pass, url },
  } = req;

  const payload = { user, pass, url };
  const { data } = await api.post('/authenticate/login-as-affiliate', payload);
  res.send(data);
};
