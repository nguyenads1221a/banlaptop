const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            require: true,
            minlenght: 5,
            maxlenght: 30,
        },
        name: {
            type: String,
            require: true,
            minlenght: 5,
            maxlenght: 30,
        },
        email: {
            type: String,
            require: true,
            minlenght: 10,
            maxlenght: 40,
            unique: true,
        },
        phone: {
            type: String,
            require: true,
            minlenght: 10,
            maxlenght: 12,
            unique: true,
        },
        address: {
            type: String,
            minlenght: 5,
            maxlenght: 40,
            require: true,
        },
        username: {
            type: String,
            require: true,
            minlenght: 7,
            maxlenght: 40,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            minlenght: 7,
            maxlenght: 40,
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
