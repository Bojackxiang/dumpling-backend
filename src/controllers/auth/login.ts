import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomizedResponse, messageObject } from "../../common";
import { LoginError } from "../../errors/LoginError";
import { RequestValidationError } from "../../errors/request-validation-error";
import * as auth from "../../services/auth";

const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const result = await auth.login({ email: email, password: password });

    // check result
    if (result.getSuccess()) {
      res.json(
        CustomizedResponse.responseBuilder({
          statusCode: messageObject.SUCCESS_LOG_IN.code,
          message: messageObject.SUCCESS_LOG_IN.message,
          data: result.getResult(),
        })
      );
    } else {
      throw result.getResult();
    }
  } catch (error) {
    console.log(error.message)
    throw new LoginError(error.message)
  }
};

export default login;
