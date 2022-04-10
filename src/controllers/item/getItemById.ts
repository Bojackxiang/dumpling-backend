import { validationResult } from "express-validator";
import { Request } from "express";
import { NotFoundError } from "../../errors/NotFoundError";
import { RequestValidationError } from "../../errors/request-validation-error";
import { AppResponse } from "../../interfaces";
import { getItemByIdSvc } from "../../services/item/get";

const getItemById = async (req: Request, res: AppResponse) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { id } = req.params;
    const result = await getItemByIdSvc({ id });

    // check result
    if (result.getSuccess()) {
      res.json({
        success: true,
        data: {},
        code: 100,
        message: "",
      });
    } else {
      throw result.getResult();
    }
  } catch (error) {
    throw new NotFoundError();
  }
};

export default getItemById;
