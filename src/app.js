const express = require('express');
const conntectDB = require("./config/database");
const app = express();
const User = require('./models/user')

app.post('/signup', async (req,res) =>{
   
    // creating a new instance of the user model
    const user = new User({
        firstName : "Virat",
        lastName : "Kohli",
        emailID : "virat@gmail.com",
        password : "Virat@123"
    });

    try{
        await user.save();
        res.send("User Added Successfully")
    } catch(err)
    {
        res.status(400).send("Error saving the user") + err.message;
    }
    
})


conntectDB().then(() => {
    console.log("Database connection is established");
    app.listen(7777, () => {
        console.log("Server is sucessfully listening on port 7777");
    });
}).catch(err => {
    console.log("Database cannot be connected");
})