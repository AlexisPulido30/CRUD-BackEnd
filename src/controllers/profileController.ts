import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthReq } from "../middlewares/requireAuth";

const prisma = new PrismaClient();

export const updateMyProfile = async (req: AuthReq, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "No autorizado" });

   
    const allowedFields = ["nombre", "telefono", "fechaNacimiento", "genero"] as const;

    const data: any = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });

   
    if (data.fechaNacimiento) {
      const d = new Date(data.fechaNacimiento);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ error: "fechaNacimiento inválida" });
      }
      data.fechaNacimiento = d;
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        nombre: true,
        correo: true,
        telefono: true,
        fechaNacimiento: true,
        genero: true,
        createdAt: true,
        activo: true,
        role: { select: { id: true, nombre: true } },
      },
    });

    return res.json({
      message: "Perfil actualizado correctamente",
      user: updated,
    });
  } catch (e: any) {
    console.error("Error en updateMyProfile:", e);
    return res.status(500).json({
      error: "Error al actualizar perfil",
      detail: e?.message,
    });
  }
};
