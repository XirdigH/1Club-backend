// const http = require('https');
// const hostname = '127.0.0.1';
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const connectDB = require('./connection.js');
const cookieParser = require("cookie-parser");
const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const ejs= require('ejs');


app.use(require('./router/regi'));
app.use(require('./router/Au'));

const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World! From OpenLiteSpeed NodeJS\n');
});

app.use(express.static("Public"));
const path = require("path");
app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'Public', 'index.html'));

    })
app.listen(port, ()=>{
    console.log(`server running port ${port}`);
});
