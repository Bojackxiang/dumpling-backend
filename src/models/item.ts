import * as mongoose from 'mongoose';

interface ItemDoc extends mongoose.Document {
    name: string;
    secondName?: string;
    stocking: number;
    price: number;
    mainImage?: string;
    descriptionImages?: string[];
    description?: string;
}
export interface ItemAttrs {
    name: string;
    secondName?: string;
    stocking: number;
    price: number;
    mainImage?: string;
    descriptionImages?: string[];
    description: string;
}

interface ItemModel extends mongoose.Model<ItemDoc> {
    build(attrs: ItemAttrs): ItemDoc;
}

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        secondName: {
            type: String,
            required: false,
        },
        stocking: {
            type: Number,
            required: false,
            default: 999,
        },
        price: {
            type: Number,
            required: true,
        },
        mainImage: {
            type: String,
            required: false,
        },
        descriptionImages: {
            type: [String],
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        toJSON: {
            // 1. 可以控制 save 之后的返回
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.descriptionImages;
            },
        },
    }
);

itemSchema.statics.build = (attrs: ItemAttrs) => {
    return new Item(attrs);
};

const Item = mongoose.model<ItemDoc, ItemModel>('Item', itemSchema);

export default Item;
