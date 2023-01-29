import server from "./src/server/server.js";
import { sequelize } from "./src/database/database.js";
import dotenv from "dotenv";

// import "./src/models/User.js";
dotenv.config();

async function main() {
  try {
    await sequelize.authenticate(); // test connection
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false });
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
