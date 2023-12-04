import express from "express";
import User from "../database/models/User";

export const userRoute = express.Router();

//CRUD: Create Read Update Delete
//TODO: Add authrization for User and Admin
//TODO: Add validator for user input
//Create
userRoute.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await User.create({ email, password });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Read
userRoute.get("/", async (req, res) => {
  try {
    const allUser = await User.findAll();
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
userRoute.get("/find/:id", async (req, res) => {
  try {
    const allUser = await User.findByPk(req.body.id);
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update
userRoute.put("/:id", async (req, res) => {
  try {
    const { id, oldPass, newPass } = req.body;
    const updatedUser = await User.update(
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
userRoute.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
