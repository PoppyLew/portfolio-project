const db = require("../db/connection");

exports.readCategories = () => {
  return db.query('SELECT * FROM categories;').then((result) => {
    return result.rows;
  });
};

exports.readReviewsById = () => {
    return db.query('SELECT * FROM reviews').then((result) => {
        return result.rows
    })
}