const mongoose = require('mongoose');

const conntectDB = async () => {
    mongoose.connect("mongodb+srv://yashchitale96:Yash123@nodejs.evcaw.mongodb.net/DevTinder");
}

module.exports = conntectDB;