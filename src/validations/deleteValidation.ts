import { param } from "express-validator";

export const deleteUserValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número")
];
