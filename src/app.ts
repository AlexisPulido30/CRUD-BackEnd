import dotenv from "dotenv";
dotenv.config();
import express from "express";      
import router from "./routes";  
import cors from "cors";
import { corsConfig } from "./config/cors";

// Crear instancia
const app = express();

// Middleware
//app.use(cors(corsConfig));
app.use(cors());
app.use(express.json());

// Rutas
app.use("/", router);

export default app;
