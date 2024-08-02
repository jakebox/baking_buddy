const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const JWTKEYSTRING = "lasdfjkflsdjf";

router.post("/signup", async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: "Bad request - missing username and or password" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      password: hashedPassword,
      recipes: [],
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfuly", id: newUser._id, username: newUser.username });
  } catch (err) {
    next(err);
  }
});

router.get("/login", (req, res, next) => {
  res.status(400).json({ message: "Can't GET login. Did you mean POST?" });
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    console.log(req.body)

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ username: user.username, userId: user._id }, JWTKEYSTRING, { expiresIn: "6hr" });
      return res.status(200).json({ message: "Authentication sucessful", user_id: user._id, token: token });
    } else {
      return res.status(401).json({ message: "Authentication failed - incorrect password" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
