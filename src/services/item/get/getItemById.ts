import { Item } from "../../../Models";

interface IGetItem {
  id: string;
  filters?: {};
}

const getItemById = async (input: IGetItem) => {
  const foundItem = await Item.findById(input.id);
  console.log('foundItem: ', foundItem);
  return null;
};

export default getItemById;
