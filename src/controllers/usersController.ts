// controllers/users.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getAllUsers = async (req: Request, res: Response) => {
  try {

    // Trae todos los usuarios
    const users = await prisma.user.findMany(); 

    // array de usuarios
    res.json(users); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};
