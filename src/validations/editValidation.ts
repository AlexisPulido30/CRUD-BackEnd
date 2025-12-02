import { body, param  } from "express-validator";

export const updateUserValidation = [
  param("id").isNumeric().withMessage("El ID debe ser numérico"),

  body("nombre").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
  body("correo").optional().isEmail().withMessage("Correo no válido"),
  body("telefono").optional().isLength({ min: 10, max: 10 }).withMessage("Teléfono inválido"),
  body("fechaNacimiento").optional().isISO8601().withMessage("Fecha inválida"),
  body("genero").optional().notEmpty().withMessage("El género es obligatorio")
];