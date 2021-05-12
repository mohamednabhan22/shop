const productsModel = require("../models/products.model");



exports.getProductById = (req, res, next) => {
    const {id} = req.params;
    productsModel
        .getProductById(id)
        .then(product => {
            res.json({
                product: product,
              
               
            });
        })
        .catch(err => res.status(400).json({error:err}));
};

