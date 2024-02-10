import { body } from "express-validator";

export const registerValidator = [
  body("name", "Name should not be empty.").not().isEmpty(),
  body("email", "Invalid. There is no email listed.").not().isEmpty(),
  body("email", "Invalid email.").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];
export const loginValidator = [
  body("email", "Invalid. There is no email listed.").not().isEmpty(),
  body("email", "Invalid email.").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];
