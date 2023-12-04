import express from "express";
import Product from "../database/models/Product";

export const productRoute = express.Router();

productRoute.get("/", async (req, res) => {
  try {
    const product = await Product.findAll();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
