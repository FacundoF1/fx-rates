import { Request, Response } from 'express';
import { createCurrency } from './create';
import { ratesByPair } from './get';

export default {
  createCurrency: async (req: Request | any, res: Response | any) => await new createCurrency(req, res).handleRequest(),
  ratesByPair: async (req: Request | any, res: Response | any) => await new ratesByPair(req, res).handleRequest()
}
