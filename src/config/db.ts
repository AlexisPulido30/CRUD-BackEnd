// Importacion 
import { PrismaClient } from "@prisma/client";

// Crea una instancia de PrismaClient 
export const prisma = new PrismaClient();

// Mi funcion para conectar la base de datos 
export const connectDB = async () => {
  try {
  
    await prisma.$connect();
    console.log("Base de datos conectada ✔");

  } catch (error) {

    console.error("Error conectando a la base de datos:", error);
    process.exit(1);
    
  }
};
