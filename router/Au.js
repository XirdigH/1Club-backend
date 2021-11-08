const { Router } = require('express');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../model/regschema');//user schema


router.get('/Au',(req,res)=>{
    res.send('login page');

});

router.post("/Au", async (req,res)=>{
    console.log(req.body);
const { email, password} = req.body; 
if(!email || !password){
    return res.status(400).json({error:"field should not be emoty"});
}
try{
    const userlog = await User.findOne({email : email});
    if(!userlog){
       res.status(400).json({message:"invalid user credential"});
    }else{
    const isMatch = await bcrypt.compare(password,userlog.password);

    
    if(isMatch){
        if(userlog.st=="active"){

        const token = await userlog.genrateAuthtoken();
       res.cookie('jwtoken',token, {
      expires: new Date(Date.now() + 258920000),
     httpOnly:true
    });        
    res.json({message:"signin success"});
    console.log("password is correct");
}else{
    
        res.json({message:"User Payment Is Panding"});
    }
}else{
        res.json({message:"password did not match"});
        console.log("password did not match");
    }}
} catch(err){
    console.log(err);
}
});





module.exports=router;