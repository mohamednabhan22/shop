const productsModel = require("../models/products.model");
const validationResult = require("express-validator").validationResult;


exports.postAdd = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        req.body.img = req.file.filename;
        productsModel
            .addNewProduct(req.body)
            .then((product) => {
                res.status(201).json({created:true,product:product});
            })
            .catch(err => {
                res.status(400).json({created:false,error:err});
            });
    } else {
        let  error=validationResult(req).array()
        res.status(400).send(error);
    }
};

exports.deleteProduct = (req, res, next) => {
    const {id} = req.params;
    productsModel
        .deleteProductById(id)
        .then(product => {
            res.json({
                product: product,
              
               
            });
        })
        .catch(err => res.status(400).json({error:err}));
};
