
const {
  readCategories,
  readReviewsById,
  updateVotesByReviewId
} = require("../models/categories-model");

exports.getCategories = (req, res, next) => {
  readCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};

exports.getReviewsById = (req, res, next) => {
    const {review_id} = req.params
  readReviewsById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.patchVotesByReviewId = (req, res, next) => {
   
    const { review_id } = req.params;
    
    
    
    updateVotesByReviewId(review_id, req.body)
    .then((review) => {
        res.status(200).send({review})
    }).catch(next)
}
