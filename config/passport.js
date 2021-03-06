const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

//serialize and deserialize

passport.serializeUser(function(user,done){
    done(null,user._id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user)
    })
})

//middleware
passport.use('local-login',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback : true
},function(req,email,password,done){
    User.findOne({email:email},function(err,user){
        if(err) return done(err)
        if(!user){
            return done(null,false,req.flash('localMessage','找不到該用戶'))
        }
        if(!user.comparePassword(password)){
            return done(null,false,req.flash('loginMessage','密碼錯誤'));
        }
        return done(null,user)
    })
}))
