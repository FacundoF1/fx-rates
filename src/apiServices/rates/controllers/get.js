const { CurrencyDBAccess, RateFeeDBAccess, getPair, CurrencyApiRestAccess, calculateRateWithFee } = require('../services');
const currencyDto = require('../dto');

class getRateFees {
    constructor(req, res) {
        this._req = req;
        this._res = res;
        this.rateFeeDB = new RateFeeDBAccess();
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

class ratesByPair {

    constructor(req, res) {
        this._req = req;
        this._res = res;
        this.currencyDB = new CurrencyDBAccess();
        this.rateFeeDB = new RateFeeDBAccess();
        this.currencyApiRest = new CurrencyApiRestAccess();
    }

    async handleRequest() {

        // lack validate type de carateres query
        const { params: { pair }, payload } = this._req;
        const { amount } = payload;
        const { base, symbols } = getPair( pair );

        if (!base || !symbols) return this._res.sendStatus(422);

        try {

            const getRateFixer = await this.currencyApiRest.getCurrencyFixer(base, symbols);
            const getRateFeePair = await this.rateFeeDB.getCurrency({pair});
            const fee = getRateFeePair[0].fee;

            const response = calculateRateWithFee({ ...getRateFixer, fee, pair, base, symbols, amount});

            // Add storage response
            this.currencyDB.createCurrency(response);
            const sanitizeResponse = currencyDto.singleCurrencyPair(response);

            return sanitizeResponse;

        } catch (error) {
            return error;
        }

    }

}

module.exports = {
    ratesByPair,
    getRateFees
}