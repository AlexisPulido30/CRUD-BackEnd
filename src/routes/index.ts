import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { requirePermission } from "../middlewares/requirePermission";
import { handleInputErrors } from "../middlewares/validation";

// controllers
import { registerUser } from "../controllers/registerController";
import { getUser, login } from "../controllers/authController";
import { getAllUsers } from "../controllers/usersController";
import { deleteUser } from "../controllers/deleteUserController";
import { updateUser } from "../controllers/editController";
import { updateMyProfile } from "../controllers/profileController";

import {
  getRoles,
  getPermisos,
  getRolePermissions,
  setRolePermissions,
} from "../controllers/rolesController";
import { updateUserRole } from "../controllers/userRoleController";

// validations
import { registerValidation } from "../validations/registerValidation";
import { loginValidation } from "../validations/loginValidation";
import { deleteUserValidation } from "../validations/deleteValidation";
import { updateUserValidation } from "../validations/editValidation";

import {
  roleIdParamValidation,
  setRolePermissionsValidation,
} from "../validations/rolesValidation";
import { updateUserRoleValidation } from "../validations/userRoleValidation";

const router = Router();

// ===== autenticacion  =====
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

router.patch(
  "/user/me",
  requireAuth,
  requirePermission("PROFILE_UPDATE"),
  updateMyProfile
);

// ===== usuarios =====
router.get("/users", requireAuth, requirePermission("USER_READ"), getAllUsers);

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

// ===== ADMIN roles ypermisos =====
router.get("/roles", requireAuth, requirePermission("ROLE_MANAGE"), getRoles);

router.get(
  "/permissions",
  requireAuth,
  requirePermission("ROLE_MANAGE"),
  getPermisos
);

router.get(
  "/roles/:id/permissions",
  requireAuth,
  requirePermission("ROLE_MANAGE"),
  roleIdParamValidation,
  handleInputErrors,
  getRolePermissions
);

router.put(
  "/roles/:id/permissions",
  requireAuth,
  requirePermission("ROLE_MANAGE"),
  setRolePermissionsValidation,
  handleInputErrors,
  setRolePermissions
);

// ===== ADMIN: Asignar rol a usuario =====
router.patch(
  "/user/:id/role",
  requireAuth,
  requirePermission("ROLE_MANAGE"), 
  updateUserRoleValidation,
  handleInputErrors,
  updateUserRole
);

export default router;
