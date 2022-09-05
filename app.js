const express = require("express");
const { getCategories, getReviewsById } = require("./controllers/categories-controller");
const app = express();

app.get("/api/categories", getCategories);

app.get('/api/reviews/:review_id', getReviewsById)

// app.all("/*", (req, res, next) => {
//   res.status(404).send({ msg: "Not Found" });
// });

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
