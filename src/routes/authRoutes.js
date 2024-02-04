const express = require("express");
const {
  verifyUser,
  registerUser,
  loginUser,
} = require("../controllers/authControllers");

const authRouter = express.Router();

//Verify user
authRouter.post("/verify", verifyUser);

//Register user
authRouter.post("/register", registerUser);

//Login user
authRouter.post("/login", loginUser);

module.exports = authRouter;
