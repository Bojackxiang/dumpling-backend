import * as express from 'express';
import { createOrder } from '../../controllers/order';
// controllers

const router = express.Router();

router.post('/create', createOrder);

export default router;
