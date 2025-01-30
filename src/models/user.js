const mongoose = require('mongoose')

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
        trim : true // remove the spacing
    },

    password : {
        type : String,
        required: true
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
        default : "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
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