import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import { generateJWT } from "../utils/jwt"; 

const prisma = new PrismaClient();

//Controlador para Login
export const login = async (req: Request, res: Response) => {

  //datos enviados desde el frontend
  const { correo, password } = req.body;

  //Busco al usuario en la base de datos por el correo
  const user = await prisma.user.findUnique({
    where: { correo }
  });

  // errors si el correo no existe
  if (!user) {
    return res.status(404).json({ error: "El usuario no existe" });
  }

  // comparar la contraseña enviada con el hash 
  const validPassword = await bcrypt.compare(password, user.password);

  // error por si la contraseña no coincide
  if (!validPassword) {
    return res.status(401).json({ error: "Password incorrecto" });
  }

  
  const token = generateJWT({ id: user.id });
  return res.json({ token });
};


//Controlador para amadar a traer mi usuario autenticado
export const getUser = async (req: Request, res: Response) => {
  res.json(req.user);
};
