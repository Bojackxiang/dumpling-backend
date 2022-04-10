import { validationResult } from "express-validator";
import { Request } from "express";
import { RequestValidationError } from "../../errors/request-validation-error";
import { AppResponse } from "../../interfaces";
import { createItemSvc } from "../../services/item/create";

const createItem = async (req: Request, res: AppResponse) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { ...items } = req.body;

    const result = await createItemSvc({
      ...items,
    });

    // check result
    res.json({
      code: 100,
      success: true,
      data: result.getResult(),
    });
  } catch (error) {
    throw error;
  }
};

export default createItem;
