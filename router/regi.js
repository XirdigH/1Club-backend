const { Router } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../model/regschema');//user schem
const Auth = require('../mid/auth');



router.get('/regi',(req,res)=>{
    res.send('register page');

});

router.post("/regi", async (req,res)=>{
    const balance=0, st="PANDING";
    const { name, email, phone, activation, password,cpassword} =req.body;//const decair
    if( !name || !email || !phone || !password || !cpassword ||!activation){
        return res.status(422).json({error:"please fill all fiald"});
    }// chaeck for empty field
    if(password!=cpassword){
        return res.status(422).json({error:"password should be same"});
    }//cheack for password match
    
    try{
    const userExist = await User.findOne({email:email});//match email. from data
    if(userExist){return res.status(422).json({error:"user Exist"});
    }

    const user = new User({name, email, phone, activation, password, balance, st});//than new user
    const sucs = await user.save()//save user to data
    if(sucs){
        return res.status(201).json({message:"user save succesfull"});
    }

} catch(err){
    console.log(err);
}    
});

router.get('/abt',Auth,(req,res)=>{
    res.send(req.rootUser);
    console.log("about");

});
router.get('/logt',async (req, res) => {
    res.cookie('jwtoken', 'none', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    })
    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })
});
router.get('/fid',async (req,res)=>{
try{
    const feed = await User.findOne({name :"feed"}); 
   res.send(feed.feed);
} catch(err){
    console.log(err);
}
});

module.exports=router;