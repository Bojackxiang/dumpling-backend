import { currentDate } from '../../utils';
import { messageObject, orderDeliveryMethod } from '../../common';
import { Order } from '../../Models';
import { orderPriceCalculator, orderValidation } from './utils';
import ServiceResult from '../serviceResult';

export interface IOrderItem {
    itemId: string;
    quantity: number;
}
export interface IOrderAttrs {
    items: IOrderItem[];
    customerId: string;
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

        // check items quantity
        const checkedItems = inputs.items.filter(
            (item: IOrderItem) => item.quantity > 0
        );

        // calculate the order price
        const calculatedPrice = await orderPriceCalculator(checkedItems);

        // build the order
        const order = Order.build({
            items: checkedItems,
            orderCreatedAt: currentDate(),
            orderUpdatedAt: currentDate(),
            orderPrice: calculatedPrice,
            customerId: inputs.customerId,
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
