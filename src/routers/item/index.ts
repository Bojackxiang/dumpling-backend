// common
import { adminAuth } from '../../middlewares';
import { body, param } from 'express-validator';
import {
    createItem,
    getItemList,
    deleteItem as deleteItemById,
    updateItemById,
    getItem as getItemById,
} from '../../controllers/item';
import * as express from 'express';
// controllers

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

router.get(
    '/list/:page',
    [param('page').exists().withMessage('page数必须存在')],
    getItemList
);

router.delete(
    '/:id',
    [param('id').exists().withMessage('商品id必须存在')],
    adminAuth,
    deleteItemById
);

router.put(
    '/',
    [body('id').exists().withMessage('商品id必须存在')],
    adminAuth,
    updateItemById
);

export default router;
