const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{type:String,unique:true,lowercase:true},
    password: String,
    profile:{
        name:{type:String,default:''},
        picture:{type:String,default:''}
    },
    history:[{
        date:Date,
        history:{type:Number,default:0}
    }]
})

//before save in database.
userSchema.pre('save',function(next){
    var user = this
    if(!user.isModified('password')) return next()
    bcrypt.genSalt(10,function(err,salt){
        if (err) throw err
        bcrypt.hash(user.password,salt,null,function(err,hash){
            user.password = hash;
            next()
        })
    })
})

userSchema.methods.comparePassword = function(password){
return bcrypt.compareSync(password,this.password)
}
userSchema.methods.gravatar = function(size){
    'use strict'
    if(!this.size) size = 170
    if(!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro'
    var md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro'
}

module.exports = mongoose.model('User',userSchema)