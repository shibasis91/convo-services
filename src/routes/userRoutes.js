const express = require("express");
const User = require("../models/Users");
const userRouter = express.Router();

//Fetch signin user details
userRouter.get("/self", async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  return res.json({ user });
});

//Search user by username or phone
userRouter.get("/", async (req, res) => {
  const { search } = req.query;
  if (!search) {
    return res.status(401).json({ message: "Search criteria is required" });
  }
  try {
    const matchingUsers = await User.find({
      $or: [
        { username: { $regex: new RegExp(search, "i") } },
        { phone: { $regex: search } },
      ],
    });
    return res.json({ users: matchingUsers });
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({ error: err.message });
  }
});

module.exports = userRouter;
