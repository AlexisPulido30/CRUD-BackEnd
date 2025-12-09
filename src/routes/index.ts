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


const router = Router();

router.post("/register", registerValidation, handleInputErrors, registerUser);

router.post("/auth/login", loginValidation, handleInputErrors, login);

router.get('/user', authenticate, getUser)

router.get("/users", getAllUsers);

router.delete("/user/:id", authenticate, deleteUserValidation, handleInputErrors, deleteUser)

router.patch("/user/:id", authenticate, updateUserValidation, handleInputErrors, updateUser)


export default router;
