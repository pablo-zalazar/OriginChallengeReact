import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "../routes/user.routes.js";

const server = express();

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use("/api/user", userRoutes);

export default server;
