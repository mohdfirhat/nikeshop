import express, { NextFunction, Request, Response } from "express";
import User, { UserAttributes } from "../database/models/User";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/verifyToken";

export const userRoute = express.Router();

//TODO: Add validator for user input
//TODO: Error-handling

//CRUD: Create Read Update Delete
//Create
//Auth: Anyone
userRoute.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } = req.body;
    const newUser: UserAttributes = await User.create({
      email,
      name,
      password,
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

//Read
//Auth:Admin
userRoute.get(
  "/",
  verifyTokenAndAdmin,
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allUser: User[] = await User.findAll();
      res.status(200).json(allUser);
    } catch (err) {
      next(err);
    }
  }
);
//Auth:Admin
userRoute.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const foundUser = await User.findByPk(id);
      res.status(200).json(foundUser);
    } catch (err) {
      next(err);
    }
  }
);

//Update
//Auth: User , Admin
userRoute.put(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { oldPass, newPass } = req.body;
      await User.update(
        { password: newPass },
        {
          where: {
            id,
            password: oldPass,
          },
        }
      );
      res.status(200).json("User password has been updated");
    } catch (err) {
      next(err);
    }
  }
);

//Delete
//Auth: User , Admin
userRoute.delete(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.destroy({
        where: {
          id,
        },
      });
      res.status(200).json(deletedUser);
    } catch (err) {
      next(err);
    }
  }
);
