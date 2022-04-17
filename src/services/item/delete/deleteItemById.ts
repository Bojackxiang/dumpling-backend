import { messageObject } from "../../../common";
import { Item } from "../../../Models";
import ServiceResult from "../../serviceResult";


interface IParam {
    id: string;
}

type IDeleteItemById = (input: IParam) => Promise<ServiceResult<any>>;

const deleteItemById: IDeleteItemById = async (input) => {
    try {

        await Item.findOneAndDelete({
            id: input.id,
        })

        return new ServiceResult(
            messageObject.SUCCESS_DELETE_ITEM_BY_ID.code,
            messageObject.SUCCESS_DELETE_ITEM_BY_ID.message,
            true,
            null
        );
    } catch (error) {
        throw error;
    }

}

export default deleteItemById

