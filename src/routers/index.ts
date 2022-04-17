import * as express from 'express';
import authRouter from './auth';
import itemRouter from './item';
const router = express.Router();

router.use('/api/auth', authRouter);
router.use('/api/item', itemRouter);

export default router;
