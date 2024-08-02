const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  recipes: [{ type: mongoose.Types.ObjectId, ref: "Recipe" }], // array of recipes
});

const User = mongoose.model("User", userSchema);

module.exports = User;
