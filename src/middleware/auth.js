const adminAuth = (req,res,next) =>{
    console.log("Admin auth is getting checked: ");
    const token = "pqr";
    const isAdminauthorized = token === "xyz";

    if(!isAdminauthorized)
    {
        console.log("You are not authorized");
        res.send("You are not authorized");
    }

    else{
        next();
    }
}

const userAuth = (req,res,next) =>{
    console.log("Admin auth is getting checked: ");
    const token = "xyz";
    const isAdminauthorized = token === "xyz";

    if(!isAdminauthorized)
    {
        console.log("You are not authorized");
        res.send("You are not authorized");
    }

    else{
        next();
    }
}

module.exports = {adminAuth, userAuth};