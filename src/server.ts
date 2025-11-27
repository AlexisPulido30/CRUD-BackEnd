import app from "./app";              
import { connectDB } from "./config/db"; 

const startServer = async () => {

  // Conexion a mi base
  await connectDB();                   

  //definicon deel puerto
  const port = process.env.PORT || 5000;

  // Se inicial el servidor 
  app.listen(port, () => {
    console.log("Servidor escuchando en el puerto:", port);
  });
};

export default startServer;  
