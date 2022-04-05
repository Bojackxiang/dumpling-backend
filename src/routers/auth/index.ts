import * as express from "express";
import { body } from "express-validator";
import { login, signUp } from "../../controllers/auth";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("nick_name")
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage("Nice name must be Validated"),
    body("phone")
      .trim()
      .isLength({ min: 5, max: 10 })
      .withMessage("Phone must be valid"),
  ],
  signUp
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be valid"),
  ],
  login
);

export default router;
