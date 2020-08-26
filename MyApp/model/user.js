const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({

    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: Object
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: Number
    }
})


module.exports = mongoose.model("User", userSchema)