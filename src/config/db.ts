import { PrismaClient } from "@prisma/client";

//instancia 
export const prisma = new PrismaClient();

//conexion 
export const connectDB = async () => {
  try {
  
    await prisma.$connect();
    console.log("Base de datos conectada");

  } catch (error) {

    console.error("Error conectando a la base de datos:", error);
    process.exit(1);
    
  }
};
