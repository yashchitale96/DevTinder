const express = require('express')
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation")
const User = require('../models/user');
const bcrypt = require("bcrypt");


authRouter.post('/signup', async(req, res) => {
    try {
        // validation of data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = new User(req.body)

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })

        const savedUser = await user.save();
        const token = await savedUser.getJWT(); // getJWT() function is present in user model

        // Add the token to cookie and send the response back to user
        res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)});
        res.json({message: "User Added Successfully", data: savedUser})

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

authRouter.post('/login', async(req, res) => {
    try {

        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credential");
        }

        const isPasswordValid = await user.validatePassword(password); // User Schema method

        if (isPasswordValid) {
            // Create the JWT Token
            // const token = await jwt.sign({_id: user._id}, "Yash123#", {expiresIn:"1d"});
            const token = await user.getJWT(); // getJWT() function is present in user model

            // Add the token to cookie and send the response back to user
            res.cookie("token", token);
            // console.log(res.cookie);
            res.send(user);
        } else {
            throw new Error("Password is not correct");
        }

    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

authRouter.post('/logout', async(req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        })

        res.send("Log out successfully");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

module.exports = authRouter;