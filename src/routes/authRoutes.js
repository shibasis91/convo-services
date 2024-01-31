const express = require("express");
const User = require("../models/Users");

const authRouter = express.Router();

//Register users
authRouter.post("/signup", async (req, res) => {
  try {
    const { username, phone, pin } = req.body;
    const newUser = new User({ username, phone, pin });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User saved successfully", user: savedUser });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.phone && err.keyValue.phone) {
      res.status(400).json({
        error: "This phone number is already in use",
        number: err.keyValue.phone,
      });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = authRouter;
