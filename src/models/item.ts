import * as mongoose from "mongoose";

// 创建 user 相关的 三个 interface
interface ItemDoc extends mongoose.Document {
  email?: string;
  phone?: string;
  password: string;
  nick_name: string;
}
export interface ItemAttrs {
  email?: string;
  phone?: string;
  password: string;
  nick_name: string;
  isActive?: boolean
  role?: string
}
interface BaseUserAttrs {
  email?: string; 
}
interface UserModel extends mongoose.Model<ItemDoc> {
  build(attrs: ItemAttrs): ItemDoc;
  findExistingUser(attrs: BaseUserAttrs): ItemDoc;
}

const itemSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nick_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'customer',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// 通过 mongoose 创建一个 user class， 并且给一个 static 方法
itemSchema.statics.build = (attrs: ItemAttrs) => {
  return new User(attrs);
};
itemSchema.statics.findExistingUser = async (input: BaseUserAttrs) => {
  return User.findOne({ email: input.email })
};
const User = mongoose.model<ItemDoc, UserModel>("Item", itemSchema);

export default User;
