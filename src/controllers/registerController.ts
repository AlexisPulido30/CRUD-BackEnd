import { Request, Response } from "express";
import { prisma } from "../config/db";
import { hashPassword } from "../utils/hashPassword";
import { sendEmail } from "../utils/sendEmail";
import { generatePassword } from "../utils/generatePassword";

export const registerUser = async (req: Request, res: Response) => {
  const { nombre, correo, telefono, fechaNacimiento, genero } = req.body;

  try {
    if (!nombre || !correo || !telefono || !fechaNacimiento || !genero) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const existingUser = await prisma.user.findUnique({ where: { correo } });
    if (existingUser) {
      return res.status(409).json({ error: "Correo ya registrado" });
    }

    // Rol por defecto (USER)
    const defaultRole = await prisma.role.findUnique({
      where: { nombre: "USER" },
      select: { id: true },
    });

    if (!defaultRole) {
      return res.status(500).json({
        error: 'No existe el rol "USER" en la BD. Crea el rol "USER" primero.',
      });
    }

    // Generar y hashear password
    const generatedPassword = generatePassword();
    const hashedPassword = await hashPassword(generatedPassword);

    // Crear usuario con rol por defecto
    const newUser = await prisma.user.create({
      data: {
        nombre,
        correo,
        telefono,
        fechaNacimiento: new Date(fechaNacimiento),
        genero,
        password: hashedPassword,
        roleId: defaultRole.id,
      },
      select: {
        id: true,
        nombre: true,
        correo: true,
        telefono: true,
        fechaNacimiento: true,
        genero: true,
        createdAt: true,
        activo: true,
        role: { select: { nombre: true } },
      },
    });

    // Enviar email con contraseña
    await sendEmail(
      correo,
      "Envio de contraseña",
      `Hola ${nombre}, tu contraseña es: ${generatedPassword}`
    );

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error registrando usuario" });
  }
};
