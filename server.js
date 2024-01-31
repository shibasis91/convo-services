const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./config/db/db");
const authRouter = require("./src/routes/authRoutes");
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend apis for convo");
});

app.use("/api/auth", authRouter);

app.listen(port, () => console.log("Server started at port: ", port));
