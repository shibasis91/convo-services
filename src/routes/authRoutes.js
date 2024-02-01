const express = require("express");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

//Register user
authRouter.post("/signup", async (req, res) => {
  try {
    const { username, phone, pin } = req.body;
    const newUser = new User({ username, phone, pin });
    const savedUser = await newUser.save();
    return res
      .status(201)
      .json({ message: "User saved successfully", user: savedUser });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.phone && err.keyValue.phone) {
      return res.status(400).json({
        error: "This phone number is already in use",
        number: err.keyValue.phone,
      });
    } else {
      return res.status(500).json({ error: err.message });
    }
  }
});

//Login user
authRouter.post("/login", async (req, res) => {
  try {
    const { phone, pin } = req.body;
    const user = await User.findOne({ phone });
    if (!user || !(await bcrypt.compare(pin, user.pin))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const SECRET_KEY = process.env.SECRET_KEY;
    const authToken = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({ message: "Login successful", authToken, user });
  } catch (err) {
    if (err) console.log("Error: ", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = authRouter;
