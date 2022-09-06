const express = require("express");

const {
  getCategories,
  getReviewsById,
  getUsers,
} = require("./controllers/categories-controller");

const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/users", getUsers);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid input" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
