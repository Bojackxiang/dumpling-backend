import * as express from "express";
import { body } from "express-validator";
import { createItem } from "../../controllers/item";
import get from "../../controllers/item/getItemById";

const router = express.Router();

router.post(
  "/create-item",
  [
    body("name").isString().withMessage("名称必须存在"),
    body("stocking").isNumeric().withMessage("库存必须是数字"),
    body("price").isNumeric().withMessage("价格必须是数字"),
  ],
  createItem
);

router.post("/item", get);

export default router;
