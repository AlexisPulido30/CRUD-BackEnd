import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Para gaurdar los datos de mi usuario
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

  // header de autorizacion
  const bearer = req.headers.authorization;

  // // funcions para comprobar el token con bearer
  if (!bearer) {
    return res.status(401).json({ error: "Usuario no autorizado" });
  }
  const [, token] = bearer.split(" ");

  // Si no viene token después de Bearer madamos del eror
  if (!token) {
    return res.status(401).json({ error: "Token inválido" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  
    // en esta parte se bisca por el id sacado del token 
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        nombre: true,
        correo: true,
        telefono: true,
        fechaNacimiento: true,
        genero: true,
        createdAt: true,
      }
    });

    // Si el usuario no existe
    if (!user) {
      return res.status(401).json({ error: "No autorizado" });
    }

    //aqui se guarda el susuario
    req.user = user;
    next();

  } catch (error) {
    // Si el token está expirado
    return res.status(401).json({ error: "Token no válido" });
  }
};
