import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "stock_utn",
  "root",
  "123456789",
  {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false, 
});

try {
  await sequelize.authenticate();
  console.log("Conexión exitosa a la base de datos.");
} catch (error) {
  console.error("Error al conectar con la base de datos:", error);
}

export default sequelize;