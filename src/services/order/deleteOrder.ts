import { messageObject } from '../../common';
import { Order } from '../../Models';
import ServiceResult from '../serviceResult';

export interface IOrderAttrs {
    id: string;
}

type IDeleteOrderById = (input: IOrderAttrs) => Promise<ServiceResult<any>>;

const deleteOrderById: IDeleteOrderById = async (inputs) => {
    try {
        const response = await Order.findOneAndDelete({
            id: inputs.id,
        });

        console.log(response);

        return new ServiceResult(
            messageObject.SUCCESS_CREATE_ORDER.code,
            messageObject.SUCCESS_CREATE_ORDER.message,
            true,
            null
        );
    } catch (error) {
        throw error;
    }
};

export default deleteOrderById;
