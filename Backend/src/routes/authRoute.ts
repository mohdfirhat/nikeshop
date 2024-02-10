import express, { NextFunction, Request, Response } from "express";
import User from "../database/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../middleware/errorHandling";
import { loginValidator, registerValidator } from "../middleware/validator";
import { validationResult } from "express-validator";

export const authRoute = express.Router();

//TODO: Add validator for user input
//TODO: Error-handling
//CRUD: Create Read Update Delete

//Create - Register
//Auth: Anyone
authRoute.post(
  "/register",
  registerValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    //encrypt password by salting and hashing
    const saltRounds = Number(process.env.SALT_ROUND);
    try {
      bcrypt.hash(password, saltRounds).then(async (hash) => {
        // Store hash in your password DB.
        const newUser = await User.create({
          name,
          email,
          password: hash,
        });
        res.status(201).json(newUser);
      });
    } catch (err) {
      next(err);
    }
  }
);

//Create - Login
//Auth: Anyone
authRoute.post(
  "/login",
  loginValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //TODO:test login
      const user = await User.findAll({ where: { email } });
      console.log(`User: ${user}`);
      if (!user) {
        throw new AppError(422, "Email not found!");
        // res.status(401).json("Email not found!");
      }

      const match = await bcrypt.compare(password, user[0].password);
      console.log(`Password match: ${match}`);
      if (match) {
        //create jwt token
        const accessToken: string = jwt.sign(
          {
            id: user[0].id,
            isAdmin: user[0].isAdmin,
          },
          process.env.JWT_SEC!,
          { expiresIn: "3d" }
        );
        //set jwt to access_token cookie
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        res.cookie("userId", user[0].id);

        //TODO:login route
        res.status(201).json({
          message: `Cookie set: Access token is ${accessToken}`,
          userId: `${user[0].id}`,
        });
      } else {
        throw new AppError(422, "Wrong Password");
        // res.status(401).json("Wrong Password!");
      }
    } catch (err) {
      next(err);
    }
  }
);

authRoute.get("/logout", (_req, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("userId");
  res.status(200).json("Cookies deleted!");
});
