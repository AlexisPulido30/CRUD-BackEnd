import { Router } from "express";
import { registerUser } from "../controllers/registerController";
import { registerValidation } from "../validations/registerValidation";
import { handleInputErrors } from "../middlewares/validation";

// Se crea una instancia
const router = Router();


// Esta es mi ruta raiz
router.post("/register", registerValidation, handleInputErrors, registerUser);

export default router;
