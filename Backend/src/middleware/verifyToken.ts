import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  console.log(accessToken);
  if (accessToken) {
    jwt.verify(accessToken, process.env.JWT_SEC!, (error: any, decode: any) => {
      if (error) {
        res.status(401).send(error);
      }
      req.user = decode;
      console.log(decode);
      next();
    });
  } else {
    res.status(401).send("There is no cookies named accessToken.");
  }
};

export const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    console.log(req.user.id);
    console.log(req.cookies.userId);
    if (req.user?.id.toString() === req.cookies.userId || req.user?.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not the user or admin!");
    }
  });
};

export const verifyTokenAndAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not an admin!");
    }
  });
};
