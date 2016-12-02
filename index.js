const express = require('express')
const app = express();
const http = require('http')
const server = http.createServer()
const configure = require('./configure').config(app)
const userRoute = require('./routes/user')
const mongojs = require('mongojs')
const db = mongojs(require('./configure').db,['wei-music'])

const port = 3000

app.use(userRoute)

app.get('/',function(req,res){
    db.tasks.find(function(err,tasks){
        if (err) throw err
        res.json(tasks)
    });
})
app.get('*',function (req,res) {
    res.status(404)
})

app.listen(port,function (err,_port) {
    _port = port;
    console.log('Hello ' + _port)
})