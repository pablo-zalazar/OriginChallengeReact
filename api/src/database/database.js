import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// export const sequelize = new Sequelize("challenge", "postgres", "password", {
//   host: "localhost",
//   dialect: "postgres",
// });

export const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASSWORD, {
  host: "localhost",
  dialect: "postgres",
});
