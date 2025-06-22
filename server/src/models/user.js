const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
        index: true
    },

    lastName: {
        type: String,
        required: true
    },

    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, // remove the spacing
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address")
            }
        }
    },

    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password must be strong");
            }
        }
    },

    age: {
        type: Number,
        min: 18,
        max: 50
    },

    gender: {
        type: String,

        enum: {
            values: ["male", "female", "others"],
            message: `{VALUE} is not valid gender type`
        },

        // validate(value){
        //     if(!["male", "female", "others"].includes(value))
        //     {
        //         throw new Error("Gender data is not valid")
        //     }
        // }
    },

    photoUrl: {
        type: String,
        default: "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
        validate(value) {
            if (!validator.isURL(value))
                throw new Error("Invalid Photo URL " + value);
        }
    },

    about: {
        type: String,
        default: "This is a default about the user!"
    },

    skills: {
        type: [String],
    },

}, { timestamps: true })


// userShema.index({firstName: 1, lastName: 1});
// userShema.index({gender : 1}); 

// User Schema Methods
userSchema.methods.getJWT = async function() {
    const user = this;

    // Create a JWT Token
    const token = await jwt.sign({ _id: user._id }, "Yash123#", { expiresIn: "1d" })
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this; // gives all the data present in user schema
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}

module.exports = mongoose.model('User', userSchema);