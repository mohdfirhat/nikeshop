import express from "express";
import Order from "../database/models/Order";
import OrderProduct, {
  OrderProductCreationAttributes,
} from "../database/models/OrderProduct";
import { ProductAttributes } from "../database/models/Product";
import { verifyToken, verifyTokenAndAuthorization } from "./authRoute";

export const orderRoute = express.Router();

// TODO: Add back the verifyTokenAnd Authorization
//TODO: Add validator for user input
//TODO: Error-handling

//CRUD: Create Read Update Delete
//Create
//Auth: User
orderRoute.post("/", verifyToken, async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  const { products, cartQuantity, totalCost } = req.body;
  try {
    const newOrder: Order = await Order.create({
      userId,
      totalCost,
      cartQuantity,
    });

    products.map(
      (product: ProductAttributes & OrderProductCreationAttributes) => {
        OrderProduct.create({
          orderId: newOrder.id,
          productId: product.id,
          size: product.size,
          color: product.color,
          quantity: product.quantity,
        });
      }
    );

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Read
//Auth: User
orderRoute.get("/", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { userId } = req.body;
    const orders: Order[] = await Order.findAll({ where: { userId } });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

orderRoute.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { id } = req.params;
    const order: Order | null = await Order.findByPk(id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update
//Auth: User
//Dont allow update Order only delete and reorder products

//Delete
//Auth:User
orderRoute.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const orders = await Order.destroy({ where: { id, userId } });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
