import * as express from 'express';
import { createOrder, deleteOrderById } from '../../controllers/order';
import { param } from 'express-validator';

// controllers

const router = express.Router();

router.post('/create', createOrder);
router.delete(
    '/remove/:id',
    [param('id').exists().withMessage('id is required')],
    deleteOrderById
);

export default router;
