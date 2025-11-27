import { Router } from "express";
import { registerUser } from "../controllers/registerController";
import { registerValidation } from "../validations/registerValidation";
import { handleInputErrors } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";
import { getUser, login } from "../controllers/authController";
import { loginValidation } from "../validations/loginValidation";


// Se crea una instancia
const router = Router();


// Esta es mi ruta raiz
router.post("/register", registerValidation, handleInputErrors, registerUser);


// LOGIN
router.post("/auth/login", loginValidation, handleInputErrors, login);

//Obtener usuaris logueado 
router.get('/user', authenticate, getUser)

export default router;
