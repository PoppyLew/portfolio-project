const express = require("express");
const { getCategories } = require("./controllers/categories-controller");
const app = express();

app.get("/api/categories", getCategories);


app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
