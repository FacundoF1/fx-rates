import { connectionNeDB } from '../../services/NeDb/dao';
import { ConnectionFixer } from '../../services/Fixer';
import { ResponseCurrencyModel } from '../../services/Fixer/model';

export class CurrencyDBAccess<T> {

    private currencyDao: connectionNeDB<T> = new connectionNeDB<T>('currency');

    public getCurrencys(page, limit) {
        return this.currencyDao.getAlls(page, limit);
    };

    public getCurrency(data): Promise<T[]> {
        return this.currencyDao.get(data);
    };

    public getCurrencyForId(id): Promise<T> {
        return this.currencyDao.getForId(id);
    };

    public createCurrency(data) {
        return this.currencyDao.create(data);
    };

    public async updateCurrency(user: T | any ): Promise<T> {
        try {
            const { id: _id } = user;
            if (!_id) { throw new Error('CurrencyDBAccess: updateCurrency not found'); }
            const result: T = await this.currencyDao.update(_id, user);
            return result;
        } catch (error) {
            return error;
        }
    }

    public async deleteCurrency(id) {
        return this.currencyDao.delete(id);
    };

}

export class RateFeeDBAccess<T> {

    private rateFeeDao: connectionNeDB<T> = new connectionNeDB<T>('rate_fee');

    public getCurrencys(page, limit) {
        return this.rateFeeDao.getAlls(page, limit);
    };

    public getCurrency(data): Promise<T[]> {
        return this.rateFeeDao.get(data);
    };

    public createCurrency(data) {
        return this.rateFeeDao.create(data);
    };

    public async updateCurrency(user: T | any): Promise<T> {
        try {
            const { id: _id } = user;
            if (!_id) { throw new Error('rateFeeDaoDBAccess: updateCurrency not found'); }
            const result: T = await this.rateFeeDao.update(_id, user);
            return result;
        } catch (error) {
            return error;
        }
    }

}

export class CurrencyApiRestAccess<T>{
    private currencyDao: ConnectionFixer = new ConnectionFixer();

    public getCurrencyFixer( base, symbols ): Promise<T[]> {
        return this.currencyDao.getFixerLatest( base, symbols );
    };
}

export function getPair( pair: string ): { base, symbols } | undefined {

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

export function calculateRateWithFee(currency: any): ResponseCurrencyModel {

    const rate_with_fee = Number(currency.rates[currency.symbols] + ((Number(currency.fee) / 100) * currency.rates[currency.symbols] ) );
    const fee_amount = Number(currency.amount * rate_with_fee);

    return {
        ...currency,
        rate: rate_with_fee,
        fee_amount
    }

}