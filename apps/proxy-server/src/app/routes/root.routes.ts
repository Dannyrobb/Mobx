import express, { NextFunction, Request, Response } from 'express';
import { asyncGetRequest, asyncPostRequest, postLoginAsAffiliate, setHeaders } from '../api/lambdaAPI';

export const router = express.Router({
  strict: true,
});

router.post('/authenticate/login-as-affiliate', postLoginAsAffiliate);

router.get('/*', (req: Request, res: Response, next: NextFunction) => {
  const {
    headers: { authorization, affiliate_url },
    query: { command: _command },
  } = req;

  const affilaiteURL = affiliate_url as string;

  if (!authorization) {
    return next(new Error('No authorization present'));
  }
  if (!affilaiteURL) {
    return next(new Error('No affiliate_url present'));
  }
  setHeaders({ authorization, affiliate_url: affilaiteURL });
  return asyncGetRequest(req, res);
});

router.post('/*', (req: Request, res: Response, next: NextFunction) => {
  const {
    headers: { authorization, affiliate_url },
    query: { command: _command },
  } = req;

  const affilaiteURL = affiliate_url as string;

  if (!authorization) {
    return next(new Error('No authorization present'));
  }
  if (!affilaiteURL) {
    return next(new Error('No affiliate_url present'));
  }

  setHeaders({ authorization, affiliate_url: affilaiteURL });
  return asyncPostRequest(req, res);
});
