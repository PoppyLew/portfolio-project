const { readCategories} = require('../models/categories-model');

exports.getCategories = (req, res, next) => {
readCategories().then((categories) => {
res.status(200).send({categories})
}).catch(next);
}

