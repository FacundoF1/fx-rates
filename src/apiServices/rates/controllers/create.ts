import { RateFeeDBAccess } from '../services';
import currencyDto from '../dto';
import {
    Request,
    Response
} from 'express';
import { systemDecorator } from '../../../decorators';
const { countInstances } = systemDecorator;

@countInstances
export class createCurrency {

    private _req: Request | any;
    private _res: Response;
    private rateFeeDB = new RateFeeDBAccess<any>();

    constructor(req: Request, res: Response) {
        this._req = req;
        this._res = res;
    }

    async handleRequest() {

        try {

            const { body: { porcent_fee, pair } } = this._req;

            if (!porcent_fee || !pair) return this._res.status(400).json('Not params').end();

            const getPair: any = await this.rateFeeDB.getCurrency({ pair });

            if (getPair && getPair.length > 0) { return this._res.send(getPair[0]).end(); }

            // lack validate type de carateres body
            const data = currencyDto.singleFee({
                pair,
                porcent_fee
            });

            const currency: any = await this.rateFeeDB.createCurrency( data );
            const response: any = currencyDto.singleResponseFee(currency);

            return this._res.send(response).end();

        } catch (error) {
            return this._res.status(404).send(error).end();
        }

    }

}
