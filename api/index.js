import server from "./src/server/server.js";
import { sequelize } from "./src/database/database.js";

// import "./src/models/User.js";

async function main() {
  try {
    await sequelize.authenticate(); // test connection
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false });
    const PORT = 8000;
    server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
