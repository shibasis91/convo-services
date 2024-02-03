const express = require("express");
const registerUsers = require("../controllers/authControllers");
const loginUsers = require("../controllers/authControllers");

const authRouter = express.Router();

//Register user
authRouter.post("/signup", registerUsers);

//Login user
authRouter.post("/login", loginUsers);

module.exports = authRouter;
