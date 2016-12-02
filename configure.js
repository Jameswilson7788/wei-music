const express = require('express')
const ejs = require('ejs')
const passport = require('passport')
const logger = require('morgan')
const bodyParser =require('body-parser')
const flash = require('express-flash')

module.exports.config = function(app){
    app.use(express.static(__dirname + '/public'))
    app.set('view engine','ejs')
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(flash());
}

module.exports.db ='mongodb://root:abc123@ds119618.mlab.com:19618/wei-music'
