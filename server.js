const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
require("./config/db/db");
const authRouter = require("./src/routes/authRoutes");
const userRouter = require("./src/routes/userRoutes");
const authenticateToken = require("./src/middlewares/authMiddleware");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend apis for convo");
});

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", authenticateToken, userRouter);

app.listen(port, () => console.log("Server started at port: ", port));
