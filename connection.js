const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' })
const URI = process.env.DATABASE;
const connectDB = async()=>{
    await mongoose.connect(URI);
    console.log("connected")
}
module.exports = connectDB;