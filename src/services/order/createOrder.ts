import { currentDate } from '../../utils';
import { messageObject, orderDeliveryMethod } from '../../common';
import { Order } from '../../Models';
import { orderValidation } from './utils';
import ServiceResult from '../serviceResult';

export interface IOrderAttrs {
    itemIds: string[];
    customerId: string;
    orderPrice: number;
    orderStatusCode?: string;
    orderAddress?: string;
    orderPhone: string;
    orderEmail?: string;
    orderComment?: string;
    orderDeliveryMethod?: number;
    orderDeliveryPrice?: number;
}

type ICreateOrder = (input: IOrderAttrs) => Promise<ServiceResult<any>>;

const createOrder: ICreateOrder = async (inputs) => {
    try {
        // order validation
        orderValidation(inputs);

        const order = Order.build({
            orderCreatedAt: currentDate(),
            orderUpdatedAt: currentDate(),
            itemIds: inputs.itemIds,
            customerId: inputs.customerId,
            orderPrice: inputs.orderPrice,
            orderAddress: inputs.orderAddress || '',
            orderPhone: inputs.orderPhone,
            orderEmail: inputs.orderEmail || '',
            orderComment: inputs.orderComment || '',
            orderDeliveryMethod:
                inputs.orderDeliveryMethod || orderDeliveryMethod.pick_up.code,
            orderDeliveryPrice: inputs.orderDeliveryPrice || 0,
        });

        // Save item
        await order.save();

        return new ServiceResult(
            messageObject.SUCCESS_CREATE_ORDER.code,
            messageObject.SUCCESS_CREATE_ORDER.message,
            true,
            order
        );
    } catch (error) {
        throw error;
    }
};

export default createOrder;
