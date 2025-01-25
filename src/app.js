const express = require('express');

const app = express();

app.use('/test',(req,res)=>{
    res.send("Hello from the server!!");
});

app.use('/hello',(req,res)=>{
    res.send("Hello Hello!!");
});

app.use('/',(req,res)=>{
    res.send("Namste From Dashboard!!");
});


app.listen(7777, ()=>{
    console.log("Server is sucessfully listening on port 7777");
    
});