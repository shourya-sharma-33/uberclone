const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname : {
        firstname: {
            type : String,
            required : true,
            minlength : [ 3 , "First name must be three characters" ],
        },
        lastname : {
            type : String,
            minlength : [ 3 , "Last name must be three characters" ],
        }
    },
    email: {
        type : String,
        required : true,
        unique : true,
        minlength : [ 5, "email must be at least 5 char long" ]
    },
    password : {
        type : String,
        required : true,
        select: false,
    },
    socketId : {
        type : String,
    }
})

userSchema.method.generateAuthToken = function() {
    const token = jwt.sign({_id : this.id}, process.env.JWT_SECRET);
    return token;
}

userSchema.method.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
