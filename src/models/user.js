const mongoose = require('mongoose')
const validator = require("validator")

const  userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true,
        minLength : 4,
        maxLength : 50
    },

    lastName : {
        type : String,
        required: true
    },

    emailId : {
        type : String,
        required: true,
        unique : true,
        lowercase : true,
        trim : true, // remove the spacing
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email Address")
            }
        }
    },

    password : {
        type : String,
        required: true,
        validate(value)
        {
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Password must be strong");
            }
        }
    },

    age : {
        type : Number,
        min : 18,
        max : 50
    },
     
    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "others"].includes(value))
            {
                throw new Error("Gender data is not valid")
            }
        }
    },

    photoUrl : {
        type : String,
        default : "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
        validate(value){
            if(!validator.isURL(value))
            throw new Error("Invalid Photo URL " + value);
        }
    },

    about : {
        type : String,
        default : "This is a default about the user!"
    },
    
    skills : {
        type : [String],
    },

},{timestamps : true})

 

module.exports = mongoose.model('User', userSchema);