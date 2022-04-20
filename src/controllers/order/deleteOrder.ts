import { Request } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../../errors/request-validation-error';
import { AppResponse } from '../../interfaces';
import { deleteOrderByIdSvc } from '../../services/order';

const deleteOrderById = async (req: Request, res: AppResponse) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { id } = req.params;

    await deleteOrderByIdSvc({ id });

    res.json({
        code: 100,
        success: true,
        data: id,
    });
};

export default deleteOrderById;
