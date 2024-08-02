const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // logger
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("");

const usersRoutes = require("./api/routes/users");
const registerRoutes = require("./api/routes/register");

app.use("/users", usersRoutes);
app.use("/", registerRoutes);

function err404(req, res, next) {
  const error = new Error("404 Not found");
  error.status = 404; // custom 404 handler
  next(error); // forward error to the next middleware
}

app.use(err404);

app.use((error, req, res, next) => {
  if (error.name === "CastError") {
    error.status = 400;
    error.message = "Bad User ID";
  }
  res.status(error.status || 500); // if not found handler use that, otherwise 500
  if (error.status !== 404) {
    console.log(error);
  }
  res.json({ error: { message: error.message } });
});

app.listen(8000, () => {
  console.log(`Server is running`);
});
