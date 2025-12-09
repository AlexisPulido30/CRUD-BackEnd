// controllers/users.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({ where: { activo: true }});

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};
