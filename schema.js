const mongoose = require('mongoose');

/* SCHEMAS */
const infoSchema = new mongoose.Schema({
    phone: {
        type: Number,
    },
    address: {
        type: String,
    }
})

const catSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 2,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            minlength: 1
        },
        user_id: {
            type: String,
            minlength: 1,
            required: true
        },
        date: {
            type: Number,
            default: Math.floor(Date.now() / 1000),
        }
    },
    { collection: 'cats'}
)

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 10,
            required: true
        },
        email: {
            type: String,
            minlength: 1,
            required: true
        },
        password: {
            type: String,
            minlength: 4,
            required: true
        },
        info: infoSchema,
        date: {
            type: Number,
            default: Math.floor(Date.now() / 1000),
        }
        
    },
    { collection: 'users'}
)

/* MODEL */
const modelCat = mongoose.model('catModel', catSchema);
const modelUser = mongoose.model('userModel', userSchema);

/* EXPORTS */
module.exports = {
    modelCat,
    modelUser,
}