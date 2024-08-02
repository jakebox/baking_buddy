const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");
const Recipe = require("../models/recipe");

const checkAuth = require("../middleware/check-auth");
const checkUser = require("../middleware/check-user");

router.use(checkAuth); // use authentication middleware

const address = "http://localhost:8000";

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().populate({ path: "recipes", select: "recipeName" });

    // manually creating the response
    const response = {
      count: users.length,
      users: users.map((user) => {
        return {
          _id: user._id,
          pass: user.password,
          username: user.username,
          recipes: user.recipes,
          // request: {
          //   type: "GET",
          //   url: address + "/users/" + user._id,
          // },
        };
      }),
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.get("/:userID", async (req, res, next) => {
  const id = req.params.userID;

  try {
    const user = await User.findById(id).populate("recipes", "-__v").select("-__v"); // don't return __v at all

    if (user) {
      console.log("Username retrieved: " + user.username);
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:userID", (req, res, next) => {
  const id = req.params.userID;
  User.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json({ message: "Successfully deleted user " + result.username });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/:userId", (req, res, next) => {
  res.status(400).json({
    message: "Can't post to /users. Did you mean to post to /users/recipes/ ?",
    request: { type: "POST", url: address + "/users/" + req.params.userId + "/recipes/" },
  });
});

router.post("/:userID/recipes/", checkUser, async (req, res, next) => {
  const id = req.params.userID;

  try {
    var user = await User.findById(id).exec();

    if (!user) return res.status(404).json({ message: "User not found" });

    const newRecipe = new Recipe({
      _id: new mongoose.Types.ObjectId(),
      recipeName: req.body.recipeName,
      icon: req.body.icon,
      ingredients: req.body.ingredients.map((ingredientSet) => ({
        ingredientName: ingredientSet.ingredientName,
        ingredientQty: ingredientSet.ingredientQty,
      })),
    });

    console.log("Posting recipe to", user.username);
    console.log(newRecipe);

    const savedRecipe = await newRecipe.save();

    user.recipes.push(savedRecipe._id);
    user = await user.save();

    res.status(200).json({
      message: "Recipe posted to user " + user.username,
      request: {
        type: "GET",
        url: address + "/users/" + user._id + "/recipes/" + newRecipe._id,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:userID/recipes/", checkUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID).populate("recipes");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.recipes);
  } catch (err) {
    next(err);
  }
});

router.get("/:userID/recipes/:recipeID", async (req, res, next) => {
  const recipeID = req.params.recipeID;

  try {
    const recipe = await Recipe.findById(recipeID).select("recipeName ingredients -_id");

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
});

router.delete("/:userID/recipes/", async (req, res, next) => {
  res.status(400).json({
    message: "Forgot to specify a recipe ID.",
    request: { type: "DELETE", url: address + "/users/" + req.params.userID + "/recipes/<recipe_id>" },
  });
});

router.delete("/:userID/recipes/:recipeID", async (req, res, next) => {
  const recipeID = req.params.recipeID;

  try {
    const recipe = await Recipe.findByIdAndDelete(recipeID);
    if (recipe) {
      console.log(recipe);
      res.status(200).json({
        message: "Recipe successfully deleted",
        recipeName: recipe.recipeName,
      });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.patch("/:userID/recipes/:recipeID", async (req, res, next) => {
  const recipeID = req.params.recipeID;

  try {
    const updatedFields = req.body;

    console.log("BODY::", req.body)

    const recipe = await Recipe.findByIdAndUpdate(recipeID, { $set: updatedFields }, { new: true });
    
    if (recipe) {
      res.status(200).json({
        message: "Recipe successfully updated",
        recipe: recipe,
      });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err) {
    next(err);
  }
});


module.exports = router;
