const { readCategories } = require('../models/categories-model');

exports.getCategories = (req, res, next) => {
readCategories().then((categories) => {
res.send(200).send({categories})
}).catch(next);
}