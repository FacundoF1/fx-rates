"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../app");
const supertest_1 = __importDefault(require("supertest"));
const request = supertest_1.default.agent(app_1.app);
describe('Rates currency fee amount', () => {
    it('Should response amount more rates with fee', () => {
        return request
            .post('/v1/rates/EURBRL')
            .send({ 'amount': 25 })
            .expect(200)
            .then(response => expect(response.body).toMatchSnapshot());
    });
    it('Create rate fee', () => {
        return request
            .post('/v1/rates/fee')
            .send({
            pair: "EURBRL",
            porcent_fee: "5"
        })
            .expect(200)
            .then(response => expect(response.body).toMatchSnapshot());
    });
});
//# sourceMappingURL=index.spec.js.map