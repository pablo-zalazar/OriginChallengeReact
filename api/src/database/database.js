import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("challenge", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});
