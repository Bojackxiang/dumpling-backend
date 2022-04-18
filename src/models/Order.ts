import * as mongoose from 'mongoose';
import { orderDeliveryMethod, orderStatus } from '../common';

interface OrderDoc extends mongoose.Document {
    orderCreatedAt: string;
    orderUpdatedAt: string;
    itemIds: string[];
    customerId: string;
    orderPrice: number;
    orderStatusCode?: string;
    orderAddress: string;
    orderPhone: string;
    orderEmail: string;
    orderComment: string;
    orderDelivery: string;
    orderDeliveryMethod: number;
    orderDeliveryPrice: number;
}
export interface OrderAttrs {
    orderCreatedAt: string;
    orderUpdatedAt: string;
    itemIds: string[];
    customerId: string;
    orderPrice: number;
    orderStatusCode?: string;
    orderAddress: string;
    orderPhone: string;
    orderEmail: string;
    orderComment: string;
    orderDeliveryMethod: number;
    orderDeliveryPrice: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
    {
        orderCreatedAt: {
            type: String,
            required: true,
        },
        orderUpdatedAt: {
            type: String,
            required: true,
        },
        itemIds: {
            type: [String],
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        orderPrice: {
            type: Number,
            required: true,
        },
        orderStatusCode: {
            type: String,
            required: true,
            default: orderStatus['wait_for_payment'].code,
        },
        orderAddress: {
            type: String,
            required: false,
        },
        orderPhone: {
            type: String,
            required: true,
        },
        orderEmail: {
            type: String,
            required: false,
        },
        orderComment: {
            type: String,
            required: false,
        },
        orderDeliveryMethod: {
            type: Number,
            required: false,
            default: orderDeliveryMethod.pick_up.code,
        },
        orderDeliveryPrice: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    {
        toJSON: {
            // 1. 可以控制 save 之后的返回
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Item(attrs);
};

const Item = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export default Item;
