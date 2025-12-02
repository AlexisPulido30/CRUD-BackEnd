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
import { updateUserValidation } from "../validations/editValidation";
import { updateUser } from "../controllers/editController";


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


//Editar Usuarios
router.patch("/user/:id", authenticate, updateUserValidation, handleInputErrors, updateUser)

export default router;
