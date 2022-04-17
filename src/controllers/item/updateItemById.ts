import { Request } from 'express'
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../../errors/request-validation-error';
import { AppResponse } from "../../interfaces";
import { updateItemById as updateItemByIdSvc } from '../../services/item'

const updateItemById = async (req: Request, res: AppResponse) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { id, ...itemBody } = req.body;

    try {
        await updateItemByIdSvc({ id, body: itemBody })

        res.status(200).json({
            success: true,
            message: '更新成功',
        });
    } catch (error) {
        throw error;
    }
}

export default updateItemById;