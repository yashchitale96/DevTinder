const express = require('express');
const { userAuth } = require('../middleware/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const userRouter = express.Router();
const User = require('../models/user')


const USER_SAFE_DATA  = "firstName lastName photoUrl age gender about skills"

// Get all the pending connection request for the logged in user
userRouter.get('/user/requests/received', userAuth, async(req,res)=>{
    try{
        const loggedInuser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId: loggedInuser._id,
            status : "interested",
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"]);
        //.populate("fromUserId", "firstName lastName");

        res.json({message: "Data fetched successfully", data:connectionRequest})
    }
    catch(err){
        req.statusCode(400).send("ERROR: ", err.message);
    }

})

userRouter.get("/user/connections", userAuth, async(req,res) =>{
    try{
        const loggedInuser = req.user

        const connectionRequests = await ConnectionRequestModel.find({
            $or:[
                {toUserId: loggedInuser._id, status: "accepted"},
                {fromUserId: loggedInuser._id, status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map(row => {
            if(row.fromUserId._id.toString() === loggedInuser._id.toString()){
                return row.toUserId
            }    

            return row.fromUserId;
        })

        res.json({data: data});
    }
    catch(err){
        res.status(400).send({"message" : err.message });
    }
})

userRouter.get('/feed', userAuth, async(req, res)=>{
    try{
        // User should see all the user cards except
        // 0. his own card
        // 1. his connections 
        // 2. ignored people
        // 3. already sent the connection request

        const loggedInuser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        limit = limit > 50 ? 50 : limit;
        
        // Find all connection request (sent + received)
        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                {fromUserId: loggedInuser._id},
                {toUserId: loggedInuser._id}
            ]
        }).select("fromUserId toUserId")

        const hideUserFromFeed = new Set();
        connectionRequests.forEach(req => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
           $and:[
            {_id : {$nin : Array.from(hideUserFromFeed)}},
            {_id : {$ne : loggedInuser._id}}
        ]         
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({data : users});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }

})

module.exports = userRouter;