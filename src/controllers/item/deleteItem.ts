import { Request } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../../errors/request-validation-error';
import { AppResponse } from '../../interfaces';
import { deleteItemById as deleteItemByIdSvc } from '../../services/item';

const deleteItemById = async (req: Request, res: AppResponse) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { id } = req.params;

    try {
        await deleteItemByIdSvc({ id });

        res.status(200).json({
            success: true,
            message: '删除成功',
        });
    } catch (error) {
        throw error;
    }
};

export default deleteItemById;
