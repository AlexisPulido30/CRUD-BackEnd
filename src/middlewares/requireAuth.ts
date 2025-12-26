import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type AuthReq = Request & {
  user?: { id: number };
};

export const requireAuth = (req: AuthReq, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Usuario no autorizado" });
  }

  const token = bearer.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token inválido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = { id: Number(decoded.id) };
    return next();
  } catch {
    return res.status(401).json({ error: "Token no válido" });
  }
};
