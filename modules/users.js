let mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bcrypt=require("bcryptjs");

let userSchema=mongoose.Schema({
  userId:{
    type:Number,
  },
  email:{
    type:String,
    //required:true
  },
   telegram:{
    type:String,
    //required:true
  },
  facebook:{
    type:String,

    //required:true
  },
  twitter:{
    type:String,

    //required:true
  },
  linkedin:{
    type:String,

    //required:true
  },
  medium:{
    type:String,

    // required:true
  },
  eth:{
    type:String,

    // required:true
  },
  RefererLink:{
    type:String,
    //unique:true,
    required:false
  },
  balance:{
    type:Number
  },
  Referered:{
    type:Number
  }
});


userSchema.methods.encryptPassword=function(password) {
  return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null)
}
userSchema.methods.validPassword=function(password) {
  return bcrypt.compareSync(password,this.password)
}

//userSchema.plugin(uniqueValidator,{ message: 'this value has been tken' })

let User=module.exports= mongoose.model('users',userSchema)
