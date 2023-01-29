import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "../routes/user.routes.js";
import helmet from "helmet";

const server = express();

server.use(morgan("dev"));
server.use(
  cors({
    origin: "*", // direcciones de donde se aceptan request (en produccion no deberia aceptar de cualquier direccion)
    methods: "GET,PUT,PATCH,POST,DELETE", // tipos de requests que acepta
  })
);
server.use(express.json());
server.use(helmet());

server.use("/api/user", userRoutes);

export default server;
