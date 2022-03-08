"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRateFees = exports.ratesByPair = void 0;
const services_1 = require("../services");
const dto_1 = __importDefault(require("../dto"));
const decorators_1 = require("../../../decorators");
const { countInstances } = decorators_1.systemDecorator;
let getRateFees = class getRateFees {
    constructor(req, res) {
        this.rateFeeDB = new services_1.RateFeeDBAccess();
        this._req = req;
        this._res = res;
    }
    async handleRequest() {
        // lack validate type de carateres query
        const { query: { page, limit } } = this._req;
        const res_page = parseInt((page || 0).toString(), 10);
        const res_limit = parseInt((limit || 10).toString(), 10);
        const currencys = await this.rateFeeDB.getCurrencys(res_page, res_limit);
        return this._res.send(dto_1.default.multiple(currencys)).end();
    }
};
getRateFees = __decorate([
    countInstances
], getRateFees);
exports.getRateFees = getRateFees;
let ratesByPair = class ratesByPair {
    constructor(req, res) {
        this.currencyDB = new services_1.CurrencyDBAccess();
        this.rateFeeDB = new services_1.RateFeeDBAccess();
        this.currencyApiRest = new services_1.CurrencyApiRestAccess();
        this._req = req;
        this._res = res;
    }
    async handleRequest() {
        // lack validate type de carateres query
        const { params: { pair }, body } = this._req;
        const { amount } = body;
        const { base, symbols } = (0, services_1.getPair)(pair);
        if (!base || !symbols)
            return this._res.sendStatus(422);
        try {
            const getRateFixer = await this.currencyApiRest.getCurrencyFixer(base, symbols);
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
            const getRateFeePair = await this.rateFeeDB.getCurrency({ pair });
            const fee = getRateFeePair[0].fee;
            const response = (0, services_1.calculateRateWithFee)({ ...getRateFixer, fee, pair, base, symbols, amount });
            // Add storage response
            this.currencyDB.createCurrency(response);
            const sanitizeResponse = dto_1.default.singleCurrencyPair(response);
            return this._res.send(sanitizeResponse).end();
        }
        catch (error) {
            return this._res.sendStatus(404).end();
        }
    }
};
ratesByPair = __decorate([
    countInstances
], ratesByPair);
exports.ratesByPair = ratesByPair;
//# sourceMappingURL=get.js.map