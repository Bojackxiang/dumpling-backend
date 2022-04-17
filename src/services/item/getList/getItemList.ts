import { messageObject } from '../../../common';
import { Item } from '../../../Models';
import ServiceResult from '../../serviceResult';

interface IGetItem {
    page: number;
    query: any;
}

const RESULT_PER_PAGE = 10;
type getItemByIdType = (input: IGetItem) => Promise<ServiceResult<any>>;

const getItemById: getItemByIdType = async (input: IGetItem) => {
    try {
        const { page, query } = input;

        const foundItemsForPage = await Item.find(query).count();
        const foundItems = await Item.find(query)
            .sort({ name: 'asc' })
            .limit(10)
            .skip((page - 1) * RESULT_PER_PAGE)
            .limit(RESULT_PER_PAGE);

        return new ServiceResult(
            messageObject.SUCCESS_GET_ITEM_BY_ID.code,
            messageObject.SUCCESS_GET_ITEM_BY_ID.message,
            true,
            {
                page: page,
                totalPage: Math.ceil(foundItemsForPage / RESULT_PER_PAGE),
                payload: foundItems,
            }
        );
    } catch (error) {
        throw error;
    }
};

export default getItemById;
