import { Request } from "express";
import { validationResult } from "express-validator";
import { messageObject } from "../../common";
import { LoginError } from "../../errors/LoginError";
import { RequestValidationError } from "../../errors/request-validation-error";
import { AppResponse } from "../../interfaces";
import * as auth from "../../services/auth";

const login = async (req: Request, res: AppResponse) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const result = await auth.login({ email: email, password: password });

    // check result
    if (result.getSuccess()) {
      // TODO: 这边要存用户的 session 
      res.json({
        success: true,
        data: result.getResult(),
        code: messageObject.SUCCESS_LOGIN.code,
        message: messageObject.SUCCESS_LOG_IN.message,
      });
    } else {
      throw result.getResult();
    }
  } catch (error) {
    throw new LoginError(error.message);
  }
};

export default login;
