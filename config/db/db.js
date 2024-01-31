const mongoose = require("mongoose");

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME;

const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.hpvhptf.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
