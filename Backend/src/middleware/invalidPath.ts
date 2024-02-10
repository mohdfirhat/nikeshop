import { NextFunction, Request, Response } from "express";
import { AppError } from "./errorHandling";

// Fallback Middleware function for returning
// 404 error for undefined paths
export const invalidPathHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    throw new AppError(404, `Invalid Path ${req.url}`);
  } catch (err) {
    next(err);
    // res.status(404).send("Invalid path");
  }
};
