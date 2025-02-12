const express = require('express');
const conntectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser")

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);




conntectDB().then(() => {
    console.log("Database connection is established");
    app.listen(7777, () => {
        console.log("Server is sucessfully listening on port 7777");
    });
}).catch(err => {
    console.log("Database cannot be connected");
})