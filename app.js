const express = require("express");

const {
  getCategories,
  getReviewsById,

  patchVotesByReviewId

  getUsers,

} = require("./controllers/categories-controller");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/users", getUsers);

app.patch("/api/reviews/:review_id", patchVotesByReviewId)


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
    res.status(400).send({ msg: "Invalid Input" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {

  if (err.code === "23502") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});



app.use((err, req, res, next) => {
  console.log(err)

  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
