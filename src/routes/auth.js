const express = require('express')
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation")
const User = require('../models/user');
const bcrypt = require("bcrypt");


authRouter.post('/signup', async (req, res) => {
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

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credential");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();

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

module.exports = authRouter;