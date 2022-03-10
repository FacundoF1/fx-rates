const { connectionNeDB } = require('../../services/NeDb/dao');
const { ConnectionFixer } = require('../../services/Fixer');

class CurrencyDBAccess {

    constructor(){
        this.currencyDao = new connectionNeDB('Currency');
    }

    getCurrencys(page, limit) {
        return this.currencyDao.getAlls(page, limit);
    };

    getCurrency(data) {
        return this.currencyDao.get(data);
    };

    getCurrencyForId(id) {
        return this.currencyDao.getForId(id);
    };

    createCurrency(data) {
        return this.currencyDao.create(data);
    };

    async updateCurrency(user) {
        try {
            const { id: _id } = user;
            if (!_id) { throw new Error('CurrencyDBAccess: updateCurrency not found'); }
            const result = await this.currencyDao.update(_id, user);
            return result;
        } catch (error) {
            return error;
        }
    }

    async deleteCurrency(id) {
        return this.currencyDao.delete(id);
    };

}

class RateFeeDBAccess {

    constructor(){
        this.rateFeeDao = new connectionNeDB('RateFee');
    }

    getCurrencys(page, limit) {
        return this.rateFeeDao.getAlls(page, limit);
    };

    getCurrency(data) {
        return this.rateFeeDao.get(data);
    };

    createCurrency(data) {
        return this.rateFeeDao.create(data);
    };

    async updateCurrency(user) {
        try {
            const { id: _id } = user;
            if (!_id) { throw new Error('rateFeeDaoDBAccess: updateCurrency not found'); }
            const result = await this.rateFeeDao.update(_id, user);
            return result;
        } catch (error) {
            return error;
        }
    }

}

class CurrencyApiRestAccess {
    constructor(){
        this.currencyDao = new ConnectionFixer();
    }

    getCurrencyFixer( base, symbols ) {
        return this.currencyDao.getFixerLatest( base, symbols );
    };
}

function getPair( pair ) {

    const pairUpperCase = pair.toUpperCase();
    const is_validate_exp_reg = /^[a-zA-Z]+$/.test(pairUpperCase);

    if (!pairUpperCase || !is_validate_exp_reg){ return; }

    const base = pairUpperCase.slice(0, 3);
    const symbols = pairUpperCase.slice(3, pairUpperCase.length);

    return {
        base,
        symbols
    };

}

function calculateRateWithFee(currency) {

    const rate_with_fee = Number(currency.rates[currency.symbols] + ((Number(currency.fee) / 100) * currency.rates[currency.symbols] ) );
    const fee_amount = Number(currency.amount * rate_with_fee);

    return {
        ...currency,
        rate: rate_with_fee,
        fee_amount
    }

}

module.exports = {
    CurrencyApiRestAccess,
    CurrencyDBAccess,
    getPair,
    calculateRateWithFee,
    RateFeeDBAccess
}