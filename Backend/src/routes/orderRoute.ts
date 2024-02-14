import express, { NextFunction, Request, Response } from "express";
import Order from "../database/models/Order";
import OrderProduct from "../database/models/OrderProduct";
import Product from "../database/models/Product";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken";
import ProductDescription from "../database/models/ProductDescription";

export const orderRoute = express.Router();

export type ProductDescriptionModel = {
  id: number;
  name: string;
  shortDesc: string;
  description: string;
  categories: string[];
  urls: string[];
  rating: number;
  price: number;
};

export type ProductModel = {
  id: number;
  productDescriptionId: number;
  stock: number;
  size: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductsWithDescriptionModel = ProductDescriptionModel & {
  products: ProductModel[];
};
export type ProductCartModel = ProductsWithDescriptionModel & {
  quantity: number;
};

//CRUD: Create Read Update Delete
//Create
//Auth: User
orderRoute.post(
  "/",
  verifyTokenAndAuthorization,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user.id);
    console.log(userId);
    const { products, cartQuantity, totalCost } = req.body;
    try {
      const newOrder: Order = await Order.create({
        userId,
        totalCost,
        cartQuantity,
      });

      products.map((product: ProductCartModel) => {
        OrderProduct.create({
          orderId: newOrder.id,
          productId: product.products[0].id,
          quantity: product.quantity,
        });
      });

      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  }
);

//Read
//Auth: User
orderRoute.get(
  "/",
  verifyTokenAndAuthorization,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.cookies;
      const orders: Order[] = await Order.findAll({
        where: { userId },
        include: [Product, ProductDescription],
      });
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }
);

orderRoute.get(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const order: Order | null = await Order.findByPk(id, {
        include: [Product, ProductDescription],
      });
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }
);
//Update
//Auth: User
//Dont allow update Order only delete and reorder products

//Delete
//Auth:User
orderRoute.delete(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const orders = await Order.destroy({ where: { id } });
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }
);
