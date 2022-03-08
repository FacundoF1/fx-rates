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
exports.createCurrency = void 0;
const services_1 = require("../services");
const dto_1 = __importDefault(require("../dto"));
const decorators_1 = require("../../../decorators");
const { countInstances } = decorators_1.systemDecorator;
let createCurrency = class createCurrency {
    constructor(req, res) {
        this.rateFeeDB = new services_1.RateFeeDBAccess();
        this._req = req;
        this._res = res;
    }
    async handleRequest() {
        try {
            const { body: { porcent_fee, pair } } = this._req;
            if (!porcent_fee || !pair)
                return this._res.status(400).json('Not params').end();
            const getPair = await this.rateFeeDB.getCurrency({ pair });
            if (getPair && getPair.length > 0) {
                return this._res.send(getPair[0]).end();
            }
            // lack validate type de carateres body
            const data = dto_1.default.singleFee({
                pair,
                porcent_fee
            });
            const currency = await this.rateFeeDB.createCurrency(data);
            const response = dto_1.default.singleResponseFee(currency);
            return this._res.send(response).end();
        }
        catch (error) {
            return this._res.status(404).send(error).end();
        }
    }
};
createCurrency = __decorate([
    countInstances
], createCurrency);
exports.createCurrency = createCurrency;
//# sourceMappingURL=create.js.map