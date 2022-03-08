import { app } from '../../../app';
import supertest from 'supertest';
const request = supertest.agent(app);

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