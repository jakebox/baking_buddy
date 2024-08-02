const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  recipeName: { type: String, required: true },
  icon: { type: String, required: false, default: "🍽️" },
  ingredients: [
    {
      ingredientName: { type: String, required: true },
      ingredientQty: { type: String, required: false },
      _id: false,
    },
  ],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
