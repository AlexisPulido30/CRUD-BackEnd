import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// EDITAR USUARIO
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Obtiene el ID desde los parámetros de la URL
    const { id } = req.params;
    const userId = Number(id);

    // Valida que el ID sea numero
    if (isNaN(userId)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    // Lista de campos que SÍ se pueden actualizar
    const allowedFields = [
      "nombre",
      "correo",
      "telefono",
      "fechaNacimiento",
      "genero",
    ];

    // Construye un objeto solo con los campos permitidos
    const data: any = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });

    //convierte la fecah
    if (data.fechaNacimiento) {
      data.fechaNacimiento = new Date(data.fechaNacimiento);
    }

    // Busca si el usuario existe en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      //error si no existe el usuario
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualiza el usuario con los campos permitidos
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    // Respuesta final al cliente
    return res.json({
      message: "Usuario actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    // errorors
    console.error("Error en updateUser:", error);
    return res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};
