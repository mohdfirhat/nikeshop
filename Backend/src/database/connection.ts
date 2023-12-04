import { Sequelize } from "sequelize-typescript";
import User from "./models/User";
import Order from "./models/Order";
import OrderProduct from "./models/OrderProduct";
import Product from "./models/Product";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);
export const connection = async () => {
  try {
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export const createTable = async () => {
  try {
    sequelize.addModels([User, Order, OrderProduct, Product]);
    await sequelize.sync();
    console.log("Tables added.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
