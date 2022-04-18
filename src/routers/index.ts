import * as express from 'express';
import authRouter from './auth';
import itemRouter from './item';
import orderRouter from './order';

const router = express.Router();

router.use('/api/auth', authRouter);
router.use('/api/item', itemRouter);
router.use('/api/order', orderRouter);

export default router;
