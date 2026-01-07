import { Request, Response } from "express";
import { prisma } from "../config/db";

type AuthRequest = Request & { user?: { id: number } };

export const updateUserRole = async (req: AuthRequest, res: Response) => {
  const userId = Number(req.params.id);
  const { roleId } = req.body;

  if (Number.isNaN(userId)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (req.user?.id === userId) {
    return res.status(403).json({ error: "No puedes cambiar tu propio rol"});
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: { select: { nombre: true } } },
  });

  if (!targetUser) {
    return res.status(404).json({ error: "Usuario no existe" });
  }

  const newRole = await prisma.role.findUnique({
    where: { id: Number(roleId) },
    select: { id: true, nombre: true },
  });

  if (!newRole) {
    return res.status(404).json({ error: "Rol no existe" });
  }

  
  if (targetUser.role.nombre === "ADMIN" && newRole.nombre !== "ADMIN") {
    const adminsCount = await prisma.user.count({
      where: { role: { nombre: "ADMIN" } },
    });

    if (adminsCount <= 1) {
      return res.status(403).json({ error: "No puedes quitar el último ADMIN" });
    }
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { roleId: Number(roleId) },
    select: {
      id: true,
      nombre: true,
      correo: true,
      role: { select: { id: true, nombre: true } },
    },
  });

  return res.json(updated);
};
