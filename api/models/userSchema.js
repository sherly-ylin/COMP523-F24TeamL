const mongoose = require("mongoose");

const User = mongoose.model(
    "User", 
    new mongoose.Schema({
        uid: String,
        username: String,
        user_fname: String,
        user_lname: String,
        user_email: String,
        password: String,
        verified: Boolean,
        uniqueString: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
);

module.exports = User;