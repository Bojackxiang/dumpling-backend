import * as express from 'express';
import { body, param } from 'express-validator';
import { createItem } from '../../controllers/item';
import getItemById from '../../controllers/item/getItemById';
import { adminAuth } from '../../middlewares';

const router = express.Router();

router.post(
    '/create-item',
    [
        body('name').isString().withMessage('名称必须存在'),
        body('stocking').isNumeric().withMessage('库存必须是数字'),
        body('price').isNumeric().withMessage('价格必须是数字'),
    ],
    adminAuth,
    createItem
);

router.get(
    '/:id',
    [param('id').exists().withMessage('商品id必须存在')],
    getItemById
);

export default router;
