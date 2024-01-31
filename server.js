const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Backend apis for convo");
});

app.listen(port, () => console.log("Server started at port: ", port));
