import { Sequelize } from "sequelize-typescript";
import User, { bulkCreateUsers } from "./models/User";
import Order from "./models/Order";
import OrderProduct from "./models/OrderProduct";
import Product, { bulkCreateProducts } from "./models/Product";
import ProductDescription, {
  bulkCreateProductDescriptions,
} from "./models/ProductDescription";

export const sequelize =
  process.env.NODE_ENV === "development"
    ? new Sequelize(
        process.env.DB_NAME ?? "",
        process.env.DB_USERNAME ?? "",
        process.env.DB_PASSWORD ?? "",
        {
          host: process.env.DB_HOST,
          dialect: "postgres",
        }
      )
    : new Sequelize(process.env.DB_URL);
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
    sequelize.addModels([
      User,
      Order,
      OrderProduct,
      Product,
      ProductDescription,
    ]);
    await sequelize.sync();
    // use this to recreate table for dev await sequelize.sync({ force: true });
    bulkCreateProductDescriptions();
    bulkCreateProducts();
    bulkCreateUsers();
    console.log("Tables created. Users, ProductDescriptions, Products added.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
