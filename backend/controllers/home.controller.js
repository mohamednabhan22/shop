const productsModel = require("../models/products.model");

exports.getHome = (req, res, next) => {
   
   productsModel.getAllProducts()
    
        .then(products => {
            res.status(200).json({
                products: products,
               
            });
        })
        .catch(err => {
            let  error=validationResult(req).array()
            res.status(400).send(error);
        });
};
