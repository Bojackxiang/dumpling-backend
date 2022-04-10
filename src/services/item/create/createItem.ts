import { messageObject } from "../../../common";
import { Item, ItemAttrs } from "../../../Models";
import ServiceResult from "../../serviceResult";

type createItemType = (input: ItemAttrs) => Promise<ServiceResult<any>>

const createItem:createItemType = async (inputs) => {
  try {

    const item = Item.build({
      name: inputs.name,      
      secondName: inputs.secondName,
      stocking: inputs.stocking,
      price: inputs.price,
      mainImage: inputs.mainImage,
      description: inputs.description,
      descriptionImages: inputs.descriptionImages,
    });

    // Save item
    await item.save();

    return new ServiceResult(
      messageObject.SUCCESS_ITEM_CREATED.code,
      messageObject.SUCCESS_ITEM_CREATED.message,
      true,
      item
    );
    
  } catch (error) {
    throw error;
  }
};

export default createItem;
