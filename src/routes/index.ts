import { Router } from "express";
import { registerUser } from "../controllers/registerController";
import { registerValidation } from "../validations/registerValidation";
import { handleInputErrors } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";
import { getUser, login } from "../controllers/authController";
import { loginValidation } from "../validations/loginValidation";
import { getAllUsers } from "../controllers/usersController";
import { deleteUser } from "../controllers/deleteUserController";
import { deleteUserValidation } from "../validations/deleteValidation";


// Se crea una instancia
const router = Router();


// Esta es mi ruta raiz
router.post("/register", registerValidation, handleInputErrors, registerUser);


// LOGIN
router.post("/auth/login", loginValidation, handleInputErrors, login);

//Obtener usuaris logueado 
router.get('/user', authenticate, getUser)

//Obtener todos los usuarios
router.get("/users", getAllUsers);

//Eliminar Usuarios
router.delete("/user/:id", authenticate, deleteUserValidation, handleInputErrors, deleteUser);


export default router;
