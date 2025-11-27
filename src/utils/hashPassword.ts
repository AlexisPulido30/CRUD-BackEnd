//Importacion
import bcrypt from "bcryptjs";

// defini y exporto la funcion hashpassword
export const hashPassword = async (password: string) => {

// Genero un const donde dice que bcrypt sea a 10 rondas de complejidas
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
