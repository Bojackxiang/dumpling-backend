import { validationResult } from 'express-validator';
import { Request } from 'express';
import { RequestValidationError } from '../../errors/request-validation-error';
import { AppResponse } from '../../interfaces';
import { getItemByIdSvc } from '../../services/item/get';

const getItemById = async (req: Request, res: AppResponse) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { id } = req.params;

        const result = await getItemByIdSvc({ id });

        res.json({
            success: true,
            data: result,
            code: 100,
        });
    } catch (error) {
        throw error;
    }
};

export default getItemById;
