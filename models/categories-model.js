const db = require("../db/connection");

exports.readCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((result) => {
    return result.rows;
  });
};

exports.readReviewsById = (review_id) => {
  return db
    .query(
      `
      SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count
      FROM reviews
      LEFT JOIN comments ON reviews.review_id = comments.review_id  
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id;
      `,
      [review_id]
    )

    .then((review) => {
      if (review.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "ID does not exist" });
      }

      return review.rows[0];
    });
};

exports.updateVotesByReviewId = (review_id, voteObj) => {
  if (Object.keys(voteObj).length > 1) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  const { inc_votes } = voteObj;
  return db
    .query(
      `UPDATE reviews
    SET
      votes = votes + $1
    WHERE review_id = $2
    RETURNING *;`,
      [inc_votes, review_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "ID does not exist" });
      }
      return result.rows[0];
    });
};

exports.readUsers = () => {
  return db.query(`SELECT * FROM users;`).then((result) => {
    return result.rows;
  });
};
