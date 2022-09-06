const db = require("../db/connection");

exports.readCategories = () => {

  return db.query(`SELECT * FROM categories;`).then((result) => {
    return result.rows;
  });
};

exports.readReviewsById = (review_id) => {
 
    return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id]).then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({status: 404, msg: 'id does not exist'})
      }
        return result.rows
    })
}

exports.readUsers = () => {
  return db.query(`SELECT * FROM users;`).then((result) => {
    return result.rows;
  });
}
