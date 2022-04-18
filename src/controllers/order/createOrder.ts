import { validationResult } from 'express-validator';
import { Request } from 'express';
import { RequestValidationError } from '../../errors/request-validation-error';
import { createOrderSvc } from '../../services/order';
import { AppResponse } from '../../interfaces';

const createOrder = async (req: Request, res: AppResponse) => {
    try {
        // TODO: 这边需要做一个 middleware 来检查 用户 的 session
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const result = await createOrderSvc({
            ...req.body,
        });

        // check result
        res.json({
            code: 100,
            success: true,
            data: result.getResult(),
        });
    } catch (error) {
        throw error;
    }
};

export default createOrder;
