import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/jwt";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { correo, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { correo },
  });

  if (!user || user.activo === false) {
    return res.status(404).json({ error: "Credenciales inválidas" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ error: "Credenciales inválidas" })
  }

  const token = generateJWT({ id: user.id });
  return res.json({ token });
};

export const getUser = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "No autorizado" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
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

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    return res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error al obtener usuario" });
  }
};

