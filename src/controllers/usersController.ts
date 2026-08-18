// controllers/users.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { activo: true },
      select: {
        id: true,
        nombre: true,
        correo: true,
        telefono: true,
        activo: true,
        fechaNacimiento: true,
        genero: true, 
        role: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: { nombre: "asc" },
    });

    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};
