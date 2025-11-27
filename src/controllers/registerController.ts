import { Request, Response } from "express";
import { prisma } from "../config/db";
import { hashPassword } from "../utils/hashPassword";
import { sendEmail } from "../utils/sendEmail";
import { generatePassword } from "../utils/generatePassword"; 

export const registerUser = async (req: Request, res: Response) => {
  const { nombre, correo, telefono, fechaNacimiento, genero } = req.body;

  try {
    // Verificar si el correo ya existe
    const existingUser = await prisma.user.findUnique({ where: { correo } });
    if (existingUser) return res.status(409).json({ error: "Correo ya registrado" });

    // Generar contraseña aleatoria
    const generatedPassword = generatePassword();

    // Hashear contraseña
    const hashedPassword = await hashPassword(generatedPassword);

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        nombre,
        correo,
        telefono,
        fechaNacimiento: new Date(fechaNacimiento),
        genero,
        password: hashedPassword,
      },
    });

    // Enviar contraseña por correo
    await sendEmail(
      correo,
      "Envio de contraseña",
      `Hola ${nombre}, tu contraseña es: ${generatedPassword}`
    );

    // Respuesta
    res.status(201).json({
      id: newUser.id,
      nombre: newUser.nombre,
      correo: newUser.correo,
      telefono: newUser.telefono,
      fechaNacimiento: newUser.fechaNacimiento,
      genero: newUser.genero,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: "Error registrando usuario" });
  }
};

