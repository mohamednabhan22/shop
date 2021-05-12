const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User= module.exports = mongoose.model("user", userSchema);



/*exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => User.findOne({ email: email }))
            .then(user => {
                if (!user) {
                    mongoose.disconnect();
                    reject("there is no user matches this email");
                } else {
                    bcrypt.compare(password, user.password).then(same => {
                        if (!same) {
                            mongoose.disconnect();
                            reject("password is incorrect");
                        } else {
                            mongoose.disconnect();
                            resolve({
                                id: user.email,
                                isAdmin: user.isAdmin
                            });
                        }
                    });
                }
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};*/
