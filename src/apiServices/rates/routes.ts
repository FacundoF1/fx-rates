import express from '@awaitjs/express';
import controllers from './controllers';

const { ratesByPair, createCurrency, } = controllers;
const router = express.Router();

router.postAsync('/fee', createCurrency);
router.postAsync('/:pair', ratesByPair);

export default router;