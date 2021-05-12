const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    totalPrice:Number,
    userId: String,
    productId: String,
    timestamp: Number
});
module.exports=mongoose.model("cart", cartSchema);

/*exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL).then(() => {
                return CartItem.findOne({ productId: data.productId,userId:data.userId });
            })
            .then((item) => {
                if(item){
                  item.amount= Number(item.amount)+Number(data.amount)
                  item.totalPrice=Number(item.price)*Number(item.amount)
                    return item.save();
                }
                let newItem = new CartItem(data);
                return newItem.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getItemsByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return CartItem.find(
                    { userId: userId },
                    {},
                    { sort: { timestamp: 1 } }
                );
            })
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};


exports.getItemByUserAndProduct = (userId,productId) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return CartItem.findOne(
                    { userId: userId,productId:productId },
                   {},
                    { sort: { timestamp: 1 } }
                );
            })
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.decreaseItem = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL).then(() => {
                return CartItem.findOne({ _id: id });
            })
            .then((item) => {
                  item.amount= Number(item.amount)-Number(1)
                  item.totalPrice=Number( item.totalPrice)-Number(item.price)
                    return item.save();
                
               
            })
            .then((item) => {
                mongoose.disconnect();
                resolve(item);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() =>{return CartItem.findByIdAndRemove(id)})
            .then((item) => {
                mongoose.disconnect();
                resolve(item);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.deleteAll = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() =>{return CartItem.deleteMany()})
            .then((item) => {
                mongoose.disconnect();
                resolve(item);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getItemById = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => CartItem.findById(id))
            .then(item => {
                mongoose.disconnect();
                resolve(item);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};*/
