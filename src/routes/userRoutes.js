const express = require("express");
const User = require("../models/Users");
const userRouter = express.Router();

//Fetch signin user details
userRouter.get("/", async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({ user });
});

module.exports = userRouter;
