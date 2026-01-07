import { param, body } from "express-validator";

export const updateUserRoleValidation = [
  param("id").isInt().withMessage("ID de usuario inválido"),
  body("roleId").isInt().withMessage("roleId inválido"),
];
 