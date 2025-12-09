import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = Number(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    const allowedFields = [
      "nombre",
      "correo",
      "telefono",
      "fechaNacimiento",
      "genero",
    ];

    const data: any = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });

    if (data.fechaNacimiento) {
      data.fechaNacimiento = new Date(data.fechaNacimiento);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return res.json({
      message: "Usuario actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error en updateUser:", error);
    return res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};
