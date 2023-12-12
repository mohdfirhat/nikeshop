import { ProductAttributes } from "./../database/models/Product";
import express, { Request, Response } from "express";
import Product from "../database/models/Product";
import { verifyTokenAndAdmin } from "./authRoute";

export const productRoute = express.Router();

//TODO: Add validator for user input
//TODO: Error-handling

//CRUD: Create Read Update Delete
//Create
//Auth: Admin
productRoute.post(
  "/",
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        shortDesc,
        description,
        sizes,
        colors,
        categories,
        urls,
        rating,
        price,
        stock,
      } = req.body;
      const product = {
        name,
        shortDesc,
        description,
        sizes,
        colors,
        categories,
        urls,
        rating,
        price,
        stock,
      };
      const newProduct: ProductAttributes = await Product.create(product);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//Read: get 10 products at a time
//Auth: Anyone
productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const { offset } = req.body;
    const product = offset
      ? await Product.findAll({ offset, limit: 10 })
      : await Product.findAll({ limit: 10 });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
productRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
//Auth: Admin
productRoute.put(
  "/:id",
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        name,
        shortDesc,
        description,
        sizes,
        colors,
        categories,
        urls,
        rating,
        price,
        stock,
      } = req.body;
      await Product.update(
        {
          name,
          shortDesc,
          description,
          sizes,
          colors,
          categories,
          urls,
          rating,
          price,
          stock,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json("Product is updated.");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//Delete
//Auth: Admin
productRoute.delete(
  "/:id",
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.destroy({
        where: {
          id,
        },
      });
      res.status(200).json(deletedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
