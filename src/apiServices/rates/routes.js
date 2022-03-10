const controllers = require('./controllers');
const { ratesByPair, createCurrency, } = controllers;
const Joi = require('joi');

const router = [
    {
        method: 'POST',
        path: '/rates/fee',
        options: {
            handler: createCurrency,
            description: "Endpoint to add a mark-up fee over the obtained FX rate",
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    porcent_fee:  Joi.number().required(),
                    pair:  Joi.string().required(),
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/rates/{pair}',
        options: {
            handler: ratesByPair,
            description: "Endpoint To create rates by obtaining FX rates from a given provider. Look amount with added rates fee",
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    amount:  Joi.number().required(),
                }),
                params: Joi.object({
                    pair: Joi.string().required()
                }),
            }
        }
    }
]

module.exports = router;