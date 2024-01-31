const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, trim: true },
  phone: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[0-9]{10,}$/.test(value);
      },
      message: "Please enter a valid phone number",
    },
  },
  pin: {
    type: String,
    require: true,
    validate: {
      validator: function (value) {
        return value.length == 6;
      },
      message: "PIN should be of 6 digits",
    },
  },
  avatar: { type: String },
  status: { type: String, trim: true },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("pin")) {
      const hashedPin = await bcrypt.hash(this.pin, 10);
      this.pin = hashedPin;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
