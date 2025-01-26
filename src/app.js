const express = require('express');
const { adminAuth, userAuth } = require('./middleware/auth');
const app = express();

// Handle Auth Middleware for all GET POST ... Requests
app.use('/admin', adminAuth);

app.get('/user', userAuth, (req, res) => {
    res.send("Hello");
});

app.get('/admin/getAllData', (req, res) => {
    res.send("All data Sent");
})

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
})

// app.use('/', (err, req, res) => {
//     if(err) {
//         res.send("Something went wrong")
//     }
// })


app.listen(7777, () => {
    console.log("Server is sucessfully listening on port 7777");

});