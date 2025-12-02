// controllers/userController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // validar si existe
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await prisma.user.delete({
     where: { id: Number(id) }
    });

    return res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error eliminando el usuario" });
  }
};
