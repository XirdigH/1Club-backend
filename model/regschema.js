const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const jwt = require('jsonwebtoken');
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    activation:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:false
    },
    balance:{
        type:Number,
        required:false
    },
    st:{
        type:String,
        required:false
    },
    transi:[{
        amount:{
            type:Number,
        required:false
        },
        datew:{
            type:String,
            required:false
        }
    }
    ],
    ref:[{
        st:{
            type:String,            
            required:false
        },
        nams:{
            type:String,
            required:false
        }
    }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    feed:[
        {
            
                type:String,
                required:false
            
        }
    ]
});
//hashing pre save
userschema.pre('save', async function(next){
    try {
        if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 12);
    }

    } catch (error) {
        console.log(error);
    }
    
});
userschema.methods.genrateAuthtoken = async function () {
    try {
        let token = jwt.sign({ _id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}
const User = mongoose.model('REG',userschema);
module.exports = User;