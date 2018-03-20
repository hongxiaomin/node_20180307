const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
let app = express();
//extended为true表示会使用express自带的解析器解析
// app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    let str='';
    req.on('data',(data)=>{
        str+=data.toString();
    });
    req.on('end',()=>{
        req.body=require('querystring').parse(str);
        next();
    })
});
app.get('/',(req,res)=>{
    fs.createReadStream('./index.html').pipe(res);
});
app.post('/login',(req,res)=>{
    console.log(req.body);
    let postData=req.body;
    res.send(postData);
});
app.listen(8060);