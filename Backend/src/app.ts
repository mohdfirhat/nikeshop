import dotenv from "dotenv";
dotenv.config();
import express, { Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { productRoute } from "./routes/productRoute";
import { userRoute } from "./routes/userRoute";
import { connection, createTable } from "./database/connection";
import { orderRoute } from "./routes/orderRoute";
import { authRoute } from "./routes/authRoute";

dotenv.config();

connection();
createTable();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.get("/api", (res: Response) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
