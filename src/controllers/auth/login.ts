import { Request, Response } from "express";
import { validationResult } from "express-validator";
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
      res.json({
        success: true,
      });
    } else {
      throw result;
    }
  } catch (error) {
    // TODO: 这边应该返回一个 jwt token
    res.json({
      success: false,
    });
  }
};

export default login;
