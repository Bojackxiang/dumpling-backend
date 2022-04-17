import { validationResult } from 'express-validator';
import { Request } from 'express';
import { RequestValidationError } from '../../errors/request-validation-error';
import { AppResponse } from '../../interfaces';
import { getItemList as getItemListSvc } from '../../services/item';

const getItemList = async (req: Request, res: AppResponse) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { page } = req.params;
        const { query } = req.body;

        const intPage: number = parseInt(page, 10);
        if (isNaN(intPage)) {
            throw new Error('invalid page');
        }
        const result = await getItemListSvc({
            page: intPage,
            query: query ?? {},
        });

        res.json({
            success: true,
            data: result,
            code: 100,
        });
    } catch (error) {
        throw error;
    }
};

export default getItemList;
