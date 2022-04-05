import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as auth from "../../services/auth";

const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errors;
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
    // TODO: 将所有的错误放在 index 中集中处理
    // TODO: 这边应该返回一个 jwt token
    res.json({
      success: false,
    });
  }
};

export default login;
