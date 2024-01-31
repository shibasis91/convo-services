const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./config/db/db");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend apis for convo");
});

app.listen(port, () => console.log("Server started at port: ", port));
