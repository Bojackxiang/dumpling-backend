import { Item } from '../../../Models';
import { IOrderItem } from '../createOrder';

const orderPriceCalculator = async (orderItem: IOrderItem[]) => {
    let price = 0;
    const orderIds = orderItem.map((item) => item.itemId);

    const foundItems = await Item.find({
        _id: {
            $in: orderIds,
        },
    }).select({
        _id: 1,
        price: 1,
    });

    orderItem.forEach((item: IOrderItem) => {
        const foundItem = foundItems.find(
            (foundItem) => foundItem._id.toString() === item.itemId
        );
        price += foundItem.price * item.quantity;
    });

    return price;
};

export default orderPriceCalculator;
