const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: String,
    img: String,
    price: Number,
    description: String,
    category: String
});

module.exports= mongoose.model("product", productSchema);

/*exports.addNewProduct = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                let newProduct = new Product(data);
                return newProduct.save();
            })
            .then(product => {
                mongoose.disconnect();
                resolve(product);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.find({});
            })
            .then(products => {
                mongoose.disconnect();
                resolve(products);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getProductById = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.findById(id);
            })
            .then(product => {
                mongoose.disconnect();
                resolve(product);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.deleteProductById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() =>{return Product.findByIdAndRemove(id)})
            .then((item) => {
                mongoose.disconnect();
                resolve(item);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};*/