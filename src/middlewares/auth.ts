import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) return res.status(401).json({ error: "Usuario no autorizado" });

  const [, token] = bearer.split(" ");
  if (!token) return res.status(401).json({ error: "Token inválido" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // ✅ solo guardamos el id
    req.user = { id: decoded.id };
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token no válido" });
  }
};

