export interface FixerModel {
    access_key: string, // [required] Your API Key.
    base: string, // [optional] Enter the three - letter currency code of your preferred base currency.
    symbols: string // [optional] Enter a list of comma - separated currency codes to limit output currencies.
}

export interface ResponseFixerModel {
    success: boolean,
    timestamp: number,
    base: string,
    date: string,
    rates: {} // { "EUR": 0.813399 }
}

export interface ResponseCurrencyModel{
    pair: string;
    original_rate: object;
    fee: number;
    fee_amount: number;
    rate: number;
}