const { readCategories, readReviewsById} = require('../models/categories-model');

exports.getCategories = (req, res, next) => {
readCategories().then((categories) => {
res.status(200).send({categories})
}).catch(next);
}

exports.getReviewsById = (req, res, next) => {
    const {reviewId} = req.params;
    console.log(reviewId)
    readReviewsById().then((reviews) => {
        res.status(200).send({reviews})
    }).catch(next);
}

