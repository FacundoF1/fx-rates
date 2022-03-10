const { RateFeeDBAccess } = require('../services');
const currencyDto = require('../dto');

class createCurrency {

    constructor(req, res) {
        this._req = req;
        this._res = res;
        this.rateFeeDB = new RateFeeDBAccess();
    }

    async handleRequest() {

        try {

            const { payload: { porcent_fee, pair } } = this._req;

            if (!porcent_fee || !pair) return 'Not params';

            const getPair = await this.rateFeeDB.getCurrency({ pair });

            if (getPair && getPair.length > 0) { return currencyDto.singleResponseFee(getPair[0]) }

            // lack validate type de carateres body
            const data = currencyDto.singleFee({
                pair,
                porcent_fee
            });

            const currency = await this.rateFeeDB.createCurrency( data );
            const response = currencyDto.singleResponseFee(currency);

            return response;

        } catch (error) {
            return error;
        }

    }

}

module.exports = {
    createCurrency
}
