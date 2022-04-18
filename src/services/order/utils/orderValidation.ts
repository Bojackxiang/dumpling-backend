import { orderDeliveryMethod } from '../../../common';
import { IOrderAttrs } from '../createOrder';

const orderValidation = (inputs: IOrderAttrs) => {
    // check items
    if (!inputs.itemIds || inputs.itemIds.length === 0) {
        throw new Error('items is required');
    }

    // check order price is number
    if (typeof inputs.orderPrice !== 'number') {
        throw new Error('order price must be number');
    }

    // check order phone
    if (!inputs.orderPhone) {
        throw new Error('order phone is required');
    }

    // if delivery method is not puck up, check address
    if (
        inputs.orderDeliveryMethod &&
        inputs.orderDeliveryMethod !== orderDeliveryMethod.pick_up.code
    ) {
        if (!inputs.orderAddress) {
            throw new Error('order address is required');
        }
    }
};

export default orderValidation;
