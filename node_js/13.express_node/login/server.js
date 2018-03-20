const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
let app =express();

app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    fs.createReadStream('./index.html').pipe(res);
});
app.get('/login',(req,res)=>{
    fs.createReadStream('./login.html').pipe(res);
});
app.post('/login',(req,res)=>{
    if(req.body.username){
        res.redirect('/home');
    }else{
        res.redirect('/login');
    }
});
app.get('/home',(req,res)=>{
    fs.createReadStream('./home.html').pipe(res);
});
app.listen(8060);