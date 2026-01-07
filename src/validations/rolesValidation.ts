import { param, body } from "express-validator";

export const roleIdParamValidation = [
  param("id").isInt().withMessage("ID de rol inválido"),
];

export const setRolePermissionsValidation = [
  param("id").isInt().withMessage("ID de rol inválido"),
  body("permissionIds")
    .isArray()
    .withMessage("permissionIds debe ser un arreglo"),
  body("permissionIds.*")
    .isInt()
    .withMessage("Cada permissionId debe ser número entero"),
];
