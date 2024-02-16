import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { productRoute } from "./routes/productRoute";
import { userRoute } from "./routes/userRoute";
import { connection } from "./database/connection";
import { orderRoute } from "./routes/orderRoute";
import { authRoute } from "./routes/authRoute";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { errorLogger, errorResponder } from "./middleware/errorHandling";
import { invalidPathHandler } from "./middleware/invalidPath";
import path from "path";

dotenv.config();

connection();
//createTable();

const app = express();
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.DEV_BASE_URL
        : process.env.PROD_BASE_URL,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/public")));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.get("/api", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(invalidPathHandler);
app.use(errorLogger);
app.use(errorResponder);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
