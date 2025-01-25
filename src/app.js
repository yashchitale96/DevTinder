const express = require('express');

const app = express();

app.use("/user", (req, res, next) => {
    // Route Handler 1
    console.log("Response 1");
    next();
    // res.send("route handler 1");
}, (req, res, next) => {
    // Route Handler 2
    console.log("Response 2");
    next();
    // res.send("route handler 2");
}, (req, res) => {
    console.log("Response 3");
    res.send("Response 3");
})


app.listen(7777, () => {
    console.log("Server is sucessfully listening on port 7777");

});