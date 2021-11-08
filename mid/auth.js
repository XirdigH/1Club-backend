const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
const jwt = require('jsonwebtoken');
const User = require('../model/regschema');
const Auth = async (req, res, next) =>{
try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
    const rootUser = await User.findOne({_id: verifyToken, "tokens.token" : token});
    if(!rootUser){throw new Error("user not found")
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
} catch (error) {
    res.status(401).send("unarthouraised");
    console.log(error);
}
}
module.exports= Auth;