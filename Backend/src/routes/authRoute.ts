import express, { NextFunction, Request, Response } from "express";
import User, { UserCreationAttributes } from "../database/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authRoute = express.Router();

//use cookie-parser
//TODO: Add validator for user input
//TODO: Error-handling
//CRUD: Create Read Update Delete

//Create - Register
//Auth: Anyone
authRoute.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  //encrypt password by salting and hashing
  const saltRounds = Number(process.env.SALT_ROUND);
  try {
    bcrypt.hash(password, saltRounds).then(function (hash) {
      // Store hash in your password DB.
      const newUser: Promise<UserCreationAttributes> = User.create({
        name,
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
    const user = await User.findAll({ where: { email } });
    console.log(`User: ${user}`);
    if (!user) {
      res.status(401).json("Email not found!");
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
      res.status(201).send({
        message: `Cookie set: Access token is ${accessToken}`,
        userId: `${user[0].id}`,
      });
    } else {
      res.status(401).json("Wrong Password!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

authRoute.get("/logout", (_req, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("userId");
  res.status(200).send("Cookies deleted!");
});

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
    if (req.user?.id === req.cookies.userId || req.user?.isAdmin) {
      console.log(req.user.id);
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
