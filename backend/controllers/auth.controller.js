const jwt=require('jsonwebtoken');
const authModel = require("../models/auth.model");
const validationResult = require("express-validator").validationResult;
const {secretKey}=require('.././config/config')


function createToken(user){
    let token=jwt.sign({
        id:user.id,
        isAdmin:user.isAdmin
    },secretKey,{
        expiresIn:9999
    })
    return token
}

exports.postSignup = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .createNewUser(req.body.username, req.body.email, req.body.password)
            .then((user) => res.status(201).json({user:user}))
            .catch(err => {
                 res.status(400).json({error:err})
               
            });
    } else {
        res.status(400).json({error:"error"})
    }
};


exports.postLogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
        .login(req.body.email, req.body.password)
        .then(user => {
           let token=createToken(user)
            res.status(200).json({
                isAdmin:user.isAdmin,
            success:true,
            message:"successfuly login",
            token:token
        })
        })
        .catch(err => {
            res.status(400).json({error:err}) 
           
        });
    } else {
        let  error=validationResult(req).array()
        res.status(400).send(error);
    }
};


