const mongoose = require('mongoose');

const userSChema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },

})

const User = mongoose.model("user", userSChema)

module.exports = User;

