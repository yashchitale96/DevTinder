const express = require('express');

const app = express();

app.use("/user", (req,res) =>{
    res.send("HAHAHAHA");
})

// this will only handele GET call to /uesr
app.get("/user", (req,res) =>{
    res.send({firstName:"Yash", lastName:"Chitale"})
})

app.post("/user", (req,res) =>{
    // Save data to the database
    res.send("Data successfully saved to the database")  
})

app.delete("/user", (req,res)=>{
    res.send("Deleted Successfully");
})
app.listen(7777, ()=>{
    console.log("Server is sucessfully listening on port 7777");
    
});