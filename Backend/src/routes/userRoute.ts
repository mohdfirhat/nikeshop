import express, { Response } from "express";
import User, { UserAttributes } from "../database/models/User";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./authRoute";

export const userRoute = express.Router();

//TODO: Add validator for user input
//TODO: Error-handling

//CRUD: Create Read Update Delete
//Create
//Auth: Anyone
userRoute.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser: UserAttributes = await User.create({ email, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Read
//Auth:Admin
userRoute.get("/", verifyTokenAndAdmin, async (res: Response) => {
  try {
    const allUser: User[] = await User.findAll();
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Auth:Admin
userRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findByPk(id);
    res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
//Auth: User , Admin
userRoute.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
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
    res.status(500).json(err);
  }
});

//Delete
//Auth: User , Admin
userRoute.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
