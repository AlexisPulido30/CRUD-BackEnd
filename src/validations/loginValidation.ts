import { body } from "express-validator";

export const loginValidation = [
  body("correo").isEmail().withMessage("El email no es válido"),
  body("password").notEmpty().withMessage("El password es obligatorio")
];
