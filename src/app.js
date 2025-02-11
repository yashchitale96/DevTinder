const express = require('express');
const conntectDB = require("./config/database");
const app = express();
const User = require('./models/user');
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require('jsonwebtoken')
const { userAuth } = require('./middleware/auth')

app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res) => {

    try {
        // validation of data
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = new User(req.body)

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating a new instance of the User model
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        })
        await user.save();
        res.send("User Added Successfully")
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }

})

app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credential");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            // Create a JWT Token
            const token = await jwt.sign({ _id: user._id }, "Yash123#", {expiresIn: "1d"})
            // console.log(token);

            // Add the token to cookie and send the response back to user
            res.cookie("token", token);
            res.send("Login successfull");
        }
        else {
            throw new Error("Password is not correct");
        }
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

app.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    }

    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

app.post('/sendConnectionRequest', userAuth,  async (req,res) => {
    const user = req.user;

    // Sending a connection request;
    console.log("Sending a connection request");
    res.send(user.firstName + " sent the connection request")
    
})


conntectDB().then(() => {
    console.log("Database connection is established");
    app.listen(7777, () => {
        console.log("Server is sucessfully listening on port 7777");
    });
}).catch(err => {
    console.log("Database cannot be connected");
})