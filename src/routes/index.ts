import express from 'express';
import rates from '../apiServices/rates/routes';
import { Monitor } from '../decorators/systemCounter';

const router = express.Router();

router.use('/rates', rates);
router.use('/systemInfo', async (req, res) => res.json(Monitor.printInstances()));

export default router;
