import app from "./app";              
import { connectDB } from "./config/db"; 

const startServer = async () => {

  await connectDB();                   

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log("Servidor funcionando en el puerto:", port);
  });
};

export default startServer;  
