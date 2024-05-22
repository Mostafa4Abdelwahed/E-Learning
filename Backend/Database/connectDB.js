const mongoose = require('mongoose');

const connectDb = ()=> {
    try {
        const uri = process.env.MONGO_URI
        mongoose.connect(uri);
        console.log("Database Connected Successfully :)");
    } catch(error) {
        console.log(error);
    }
}

module.exports = connectDb