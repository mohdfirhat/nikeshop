import express, { NextFunction, Request, Response } from "express";
import User, { UserCreationAttributes } from "../database/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const authRoute = express.Router();

//use cookie-parser
//TODO: Add validator for user input
//TODO: Error-handling
//CRUD: Create Read Update Delete
authRoute.use(cookieParser());
//Create - Register
//Auth: Anyone
authRoute.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //encrypt password by salting and hashing
  const saltRounds = Number(process.env.SALT_ROUND);
  try {
    bcrypt.hash(password, saltRounds).then(function (hash) {
      // Store hash in your password DB.
      const newUser: Promise<UserCreationAttributes> = User.create({
        email,
        password: hash,
      });
      res.status(201).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create - Login
//Auth: Anyone
authRoute.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    //TODO:test login
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      throw Error("Wrong Email");
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (match) {
      //create jwt token
      const accessToken: string = jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC!,
        { expiresIn: "3d" }
      );
      //set jwt to access_token cookie
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      //TODO:login route
      res.status(201).send();
    } else {
      res.status(401).json("Wrong Password!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const access_token = req.cookies;
  if (access_token) {
    jwt.verify(
      access_token,
      process.env.JWT_SEC!,
      (error: any, decode: any) => {
        if (error) {
          res.status(401).send(error);
        }
        req.user = decode;
        next();
      }
    );
  }
};

export const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user?.id === req.params.id || req.user?.isAdmin) {
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
