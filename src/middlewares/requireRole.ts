import { Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthReq } from "./requireAuth";

const prisma = new PrismaClient();

type RoleName = "USER" | "SUPERVISOR" | "ADMIN";

export const requireRole =
  (...allowed: RoleName[]) =>
  async (req: AuthReq, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "No autorizado" });

     //consulta de usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: { select: { nombre: true } } },
    });

    const roleName = user?.role?.nombre as RoleName | undefined;
    if (!roleName) return res.status(403).json({ error: "Rol no asignado" });

    if (!allowed.includes(roleName)) {
      return res.status(403).json({ error: "No tienes permisos" });
    }

    next();
  };
