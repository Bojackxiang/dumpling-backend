import { messageObject } from '../../../common';
import { NotFoundError } from '../../../errors/NotFoundError';
import { Item } from '../../../Models';
import ServiceResult from '../../serviceResult';

interface IParam {
    id: string;
    body: any;
}
type IUpdateItemById = (input: IParam) => Promise<ServiceResult<any>>;
const updateItemById: IUpdateItemById = async (input) => {
    try {
        const { id, body } = input;

        const item = await Item.findById(id);

        if (!item) {
            throw new NotFoundError()
        }

        await Item.findOneAndUpdate(
            {
                id,
            },
            body,
            { new: true }
        );

        return new ServiceResult(
            messageObject.SUCCESS_ITEM_CREATED.code,
            messageObject.SUCCESS_ITEM_CREATED.message,
            true
        );
    } catch (error) {
        throw error;
    }
};

export default updateItemById;
