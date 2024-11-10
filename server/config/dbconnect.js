const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DataBase Connected Successful"))
    .catch( (error) => {
        console.log("Issue in Connecting to DataBase ");
        console.error(error.message);
       
        process.exit(1);
    } );
}

module.exports = dbConnect;