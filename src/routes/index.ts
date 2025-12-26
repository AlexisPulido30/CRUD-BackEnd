import { Router } from "express";
import { registerUser } from "../controllers/registerController";
import { registerValidation } from "../validations/registerValidation";
import { handleInputErrors } from "../middlewares/validation";
import { requireAuth } from "../middlewares/requireAuth";
import { getUser, login } from "../controllers/authController";
import { loginValidation } from "../validations/loginValidation";
import { getAllUsers } from "../controllers/usersController";
import { deleteUser } from "../controllers/deleteUserController";
import { deleteUserValidation } from "../validations/deleteValidation";
import { updateUserValidation } from "../validations/editValidation";
import { updateUser } from "../controllers/editController";
import { requirePermission } from "../middlewares/requirePermission";
import { updateMyProfile } from "../controllers/profileController";

const router = Router();

router.post(
  "/register",
  requireAuth,
  requirePermission("USER_CREATE"),
  registerValidation,
  handleInputErrors,
  registerUser
);

router.post("/auth/login", loginValidation, handleInputErrors, login);

router.get("/user", requireAuth, getUser);

router.get("/users", requireAuth, requirePermission("USER_READ"), getAllUsers);


router.patch(
  "/user/me",
  requireAuth,
  requirePermission("PROFILE_UPDATE"),
  updateMyProfile
);


router.delete(
  "/user/:id",
  requireAuth,
  requirePermission("USER_DELETE"),
  deleteUserValidation,
  handleInputErrors,
  deleteUser
);

router.patch(
  "/user/:id",
  requireAuth,
  requirePermission("USER_UPDATE"),
  updateUserValidation,
  handleInputErrors,
  updateUser
);

export default router;
