import { ResponseFixerModel } from '../../../services/Fixer/model';
import { CurrencyDBAccess, RateFeeDBAccess, getPair, CurrencyApiRestAccess, calculateRateWithFee } from '../services';
import currencyDto from '../dto';
import {
    Request,
    Response
} from 'express';
import { systemDecorator } from '../../../decorators';
const { countInstances } = systemDecorator;

@countInstances
class getRateFees {

    private _req: Request | any;
    private _res: Response;
    private rateFeeDB = new RateFeeDBAccess<any>();

    constructor(req: Request, res: Response) {
        this._req = req;
        this._res = res;
    }

    async handleRequest() {

        // lack validate type de carateres query
        const { query: { page, limit } } = this._req;
        const res_page = parseInt((page || 0).toString(), 10);
        const res_limit = parseInt((limit || 10).toString(), 10);
        const currencys = await this.rateFeeDB.getCurrencys(res_page, res_limit);

        return this._res.send(currencyDto.multiple(currencys)).end();
    }

}

@countInstances
class ratesByPair {

    private _req: Request | any;
    private _res: Response;
    private currencyDB = new CurrencyDBAccess();
    private rateFeeDB = new RateFeeDBAccess<any>();
    private currencyApiRest = new CurrencyApiRestAccess<ResponseFixerModel>();

    constructor(req: Request, res: Response) {
        this._req = req;
        this._res = res;
    }

    async handleRequest() {

        // lack validate type de carateres query
        const { params: { pair }, body } = this._req;
        const { amount } = body;
        const { base, symbols }: any = getPair( pair );

        if (!base || !symbols) return this._res.sendStatus(422);

        try {

            const getRateFixer: ResponseFixerModel | any = await this.currencyApiRest.getCurrencyFixer(base, symbols);
            // {
            //     "success": true,
            //     "timestamp": 1646698323,
            //     "base": "EUR",
            //     "date": "2022-03-08",
            //     "rates": {
            //         "BRL": 5.553384
            //     },
            //     "symbols": "BRL"
            // }

            const getRateFeePair: any = await this.rateFeeDB.getCurrency({pair});
            const fee = getRateFeePair[0].fee;

            const response = calculateRateWithFee({ ...getRateFixer, fee, pair, base, symbols, amount});

            // Add storage response
            this.currencyDB.createCurrency(response);
            const sanitizeResponse = currencyDto.singleCurrencyPair(response);

            return this._res.send(sanitizeResponse).end();

        } catch (error) {
            return this._res.sendStatus(404).end();
        }

    }

}

export {
    ratesByPair,
    getRateFees
}