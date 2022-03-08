"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRateWithFee = exports.getPair = exports.CurrencyApiRestAccess = exports.RateFeeDBAccess = exports.CurrencyDBAccess = void 0;
const dao_1 = require("../../services/NeDb/dao");
const Fixer_1 = require("../../services/Fixer");
class CurrencyDBAccess {
    constructor() {
        this.currencyDao = new dao_1.connectionNeDB('currency');
    }
    getCurrencys(page, limit) {
        return this.currencyDao.getAlls(page, limit);
    }
    ;
    getCurrency(data) {
        return this.currencyDao.get(data);
    }
    ;
    getCurrencyForId(id) {
        return this.currencyDao.getForId(id);
    }
    ;
    createCurrency(data) {
        return this.currencyDao.create(data);
    }
    ;
    async updateCurrency(user) {
        try {
            const { id: _id } = user;
            if (!_id) {
                throw new Error('CurrencyDBAccess: updateCurrency not found');
            }
            const result = await this.currencyDao.update(_id, user);
            return result;
        }
        catch (error) {
            return error;
        }
    }
    async deleteCurrency(id) {
        return this.currencyDao.delete(id);
    }
    ;
}
exports.CurrencyDBAccess = CurrencyDBAccess;
class RateFeeDBAccess {
    constructor() {
        this.rateFeeDao = new dao_1.connectionNeDB('rate_fee');
    }
    getCurrencys(page, limit) {
        return this.rateFeeDao.getAlls(page, limit);
    }
    ;
    getCurrency(data) {
        return this.rateFeeDao.get(data);
    }
    ;
    createCurrency(data) {
        return this.rateFeeDao.create(data);
    }
    ;
    async updateCurrency(user) {
        try {
            const { id: _id } = user;
            if (!_id) {
                throw new Error('rateFeeDaoDBAccess: updateCurrency not found');
            }
            const result = await this.rateFeeDao.update(_id, user);
            return result;
        }
        catch (error) {
            return error;
        }
    }
}
exports.RateFeeDBAccess = RateFeeDBAccess;
class CurrencyApiRestAccess {
    constructor() {
        this.currencyDao = new Fixer_1.ConnectionFixer();
    }
    getCurrencyFixer(base, symbols) {
        return this.currencyDao.getFixerLatest(base, symbols);
    }
    ;
}
exports.CurrencyApiRestAccess = CurrencyApiRestAccess;
function getPair(pair) {
    const pairUpperCase = pair.toUpperCase();
    const is_validate_exp_reg = /^[a-zA-Z]+$/.test(pairUpperCase);
    if (!pairUpperCase || !is_validate_exp_reg) {
        return;
    }
    const base = pairUpperCase.slice(0, 3);
    const symbols = pairUpperCase.slice(3, pairUpperCase.length);
    return {
        base,
        symbols
    };
}
exports.getPair = getPair;
function calculateRateWithFee(currency) {
    const rate_with_fee = Number(currency.rates[currency.symbols] + ((Number(currency.fee) / 100) * currency.rates[currency.symbols]));
    const fee_amount = Number(currency.amount * rate_with_fee);
    return {
        ...currency,
        rate: rate_with_fee,
        fee_amount
    };
}
exports.calculateRateWithFee = calculateRateWithFee;
//# sourceMappingURL=services.js.map