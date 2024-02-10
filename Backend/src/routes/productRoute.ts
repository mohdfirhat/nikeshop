import express, { NextFunction, Request, Response } from "express";
import Product from "../database/models/Product";
import { verifyTokenAndAdmin } from "../middleware/verifyToken";
import { Op } from "sequelize";
import ProductDescription from "../database/models/ProductDescription";

export const productRoute = express.Router();

//TODO: Add validator for user input
//TODO: Error-handling

//CRUD: Create Read Update Delete
//Create
//Auth: Admin
productRoute.post(
  "/",
  verifyTokenAndAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        shortDesc,
        description,
        categories,
        urls,
        rating,
        price,
        stock,
        size,
        color,
      } = req.body;
      const productDescription = {
        name,
        shortDesc,
        description,
        categories,
        urls,
        rating,
        price,
      };
      const newProductDescription = await ProductDescription.create(
        productDescription
      );

      const newProduct = await Product.create({
        productDescriptionId: newProductDescription.id,
        stock,
        size,
        color,
      });

      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }
);

//Read: get 10 products at a time
//Auth: Anyone
productRoute.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category } = req.params;
      const { offset } = req.body;
      const product = offset
        ? await ProductDescription.findAll({
            offset,
            limit: 10,
            where: { categories: { [Op.contains]: [category] } },
          })
        : await ProductDescription.findAll({
            limit: 10,
            where: { categories: { [Op.contains]: [category] } },
          });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
);

productRoute.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await ProductDescription.findOne({
        include: Product,
        where: { id },
      });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
);

//Update
//Auth: Admin
productRoute.put(
  "/:id",
  verifyTokenAndAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const {
        name,
        shortDesc,
        description,
        categories,
        urls,
        rating,
        price,
        productDescriptionId,
        stock,
        size,
        color,
      } = req.body;

      await Product.update(
        {
          stock,
          size,
          color,
        },
        {
          where: {
            id,
          },
        }
      );
      await ProductDescription.update(
        {
          name,
          shortDesc,
          description,
          categories,
          urls,
          rating,
          price,
        },
        {
          where: {
            id: productDescriptionId,
          },
        }
      );
      res.status(200).json("Product is updated.");
    } catch (err) {
      next(err);
    }
  }
);

//Delete
//Auth: Admin
productRoute.delete(
  "/:id",
  verifyTokenAndAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.destroy({
        where: {
          id,
        },
      });
      res.status(200).json(deletedProduct);
    } catch (err) {
      next(err);
    }
  }
);
