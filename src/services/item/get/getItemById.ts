import { messageObject } from '../../../common';
import { Item } from '../../../Models';
import ServiceResult from '../../serviceResult';

interface IGetItem {
    id: string;
}

type getItemByIdType = (input: IGetItem) => Promise<ServiceResult<any>>;

const getItemById: getItemByIdType = async (input: IGetItem) => {
    const foundItem = await Item.findById({
        _id: input.id,
    });

    return new ServiceResult(
        messageObject.SUCCESS_GET_ITEM_BY_ID.code,
        messageObject.SUCCESS_GET_ITEM_BY_ID.message,
        true,
        foundItem
    );
};

export default getItemById;
