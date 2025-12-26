import { Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthReq } from "./requireAuth";

const prisma = new PrismaClient();

type PermissionName =
  | "USER_READ"
  | "USER_CREATE"
  | "USER_UPDATE"
  | "USER_DELETE"
  | "ROLE_MANAGE"
  | "PROFILE_READ"
  | "PROFILE_UPDATE";

export const requirePermission =
  (...allowed: PermissionName[]) =>
  async (req: AuthReq, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "No autorizado" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: {
          select: {
            permissions: {
              select: {
                permission: { select: { nombre: true } }, 
              },
            },
          },
        },
      },
    });

    const perms = new Set(
      user?.role?.permissions?.map((rp) => rp.permission.nombre) ?? []
    );

    const ok = allowed.some((p) => perms.has(p));
    if (!ok) return res.status(403).json({ error: "No tienes permisos" });

    next();
  };
