const cartModel = require("../models/cart.model");
const validationResult = require("express-validator").validationResult;

exports.getCart = (req, res, next) => {
    cartModel
        .getItemsByUser( req.decoded.id)
        .then(items => {
            res.status(200).json({
                items: items,
          
            });
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

exports.getItemByUserAndProduct = (req, res, next) => {
    cartModel
        .getItemByUserAndProduct( req.decoded.id,req.params.productId)
        .then(item => {
            res.status(200).json({
                item: item,
                success:true
          
            });
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

exports.postCart = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel
            .addNewItem({
                name: req.body.name,
                price: req.body.price,
                amount: req.body.amount,
                productId: req.body.productId,
                userId:  req.decoded.id,
                totalPrice:req.body.price*req.body.amount,
                timestamp: Date.now()
            })
            .then((item) => {
                res.status(201).json({item:item,created:true});
            })
            .catch(err => {
                res.status(400).send(err);
            });
    } else {
     let  error=validationResult(req).array()
        res.status(400).send(error);
    }
};


exports.postDelete = (req, res, next) => {
    cartModel
        .deleteItem(req.body.cartId)
        .then((item) => res.json({deleted:true,item:item}))
        .catch(err => res.json({err:err}));
};

exports.postDecrease = (req, res, next) => {
    cartModel
        .decreaseItem(req.body.cartId)
        .then((item) => res.json({decreased:true,item:item}))
        .catch(err => res.json({err:err}));
};
exports.postDeleteAll = (req, res, next) => {
    cartModel
        .deleteAll()
        .then(() => res.json({deleted:true}))
        .catch(err => res.json({err:err}));
};
