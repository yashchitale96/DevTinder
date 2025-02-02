const express = require('express');
const conntectDB = require("./config/database");
const app = express();
const User = require('./models/user');
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt");
app.use(express.json());

app.post('/signup', async (req, res) => {

    
    // console.log(req.body);
    
    // creating a new instance of the user model
    // const user = new User({
    //     firstName : "Virat",
    //     lastName : "Kohli",
    //     emailID : "virat@gmail.com",
    //     password : "Virat@123"
    // });

    try {
        // validation of data
        validateSignUpData(req);
        const {firstName, lastName, emailId, password} = new User(req.body)

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Creating a new instance of the User model
        const user = new User({
            firstName, lastName, emailId, password : passwordHash
        })
        await user.save();
        res.send("User Added Successfully") 
    } catch (err) {
        res.status(400).send("Error: " + err.message) ;
    }

})

app.post('/login', async(req,res) =>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId : emailId});
        if(!user)
        {
            throw new Error("Invalid Credential");
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(isPasswordValid)
        {
            res.send("Login successfull");
        }
        else {
            throw new Error("Password is not correct");
        }
    }catch(err)
    {
        res.status(400).send("Error: " + err.message)
    }
})
// GET user by email
app.get("/user", async (req, res) => {
    try{
        const useremail = req.body.emailId;
        
        const user = await User.findOne({emailId : useremail});
        
        if(!user) res.status(404).send("Not found");
        
        else res.send(user);
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

// Feed API - GET / feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

// Delete user by id
app.delete("/user", async(req,res) =>{
    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted Successfully");
    }
    catch(err){
        res.status(400).send("Error");
    }
})

// Update data of the user
app.patch("/user/:userId", async(req,res) =>{
    const userId = req.params?.userId;
    const data = req.body;
    
    try{
        const ALLOWED_UPDATES = ["password ","photoUrl", "about", "gender", "age", "skills"]
        const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k))
        
        if(!isUpdateAllowed)
        {
           throw new Error("Update is not allowed");
        }

        if(data?.skills.length > 10)
        {
            throw new Error("Skills can not be more than 10")
        }
        await User.findByIdAndUpdate({_id : userId }, data,{runValidators : true});
        res.send("User updated successfully");
    }
    catch(err)
    {
        res.status(400).send("Something went wrong " + err.message);
    }
})

// Update data of the user
app.patch("")

conntectDB().then(() => {
    console.log("Database connection is established");
    app.listen(7777, () => {
        console.log("Server is sucessfully listening on port 7777");
    });
}).catch(err => {
    console.log("Database cannot be connected");
})