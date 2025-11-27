import { body } from "express-validator";

//Regla de validacion de los datos
export const registerValidation = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("correo").isEmail().withMessage("Correo inválido"),
  body("telefono").notEmpty().withMessage("Teléfono obligatorio"),
  body("fechaNacimiento").isDate().withMessage("Fecha de nacimiento inválida"),
  body("genero").notEmpty().withMessage("Género obligatorio"),
];
