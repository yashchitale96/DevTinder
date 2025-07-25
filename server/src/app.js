const express = require("express");
const conntectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

conntectDB()
    .then(() => {
        console.log("Database connection is established");
        app.listen(7777, () => {
            console.log("Server is sucessfully listening on port 7777");
        });
    })
    .catch((err) => {
        console.log("Database cannot be connected");
    });