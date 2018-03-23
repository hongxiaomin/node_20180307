const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const db = './users.json';

let app =express();
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    fs.createReadStream('./index.html').pipe(res);
});
app.get('/api/users',(req,res)=>{
    fs.createReadStream(db).pipe(res);
});
app.post('/api/users',(req,res)=>{
    let users = require(db);
    let user = req.body;
    console.log(user);
    user.id=users.length+1;
    users.push(user);
    fs.writeFile(db,JSON.stringify(users),(err)=>{
        if(err){
            res.send({code:-1,message:'add user failed'});
        }else{
            res.send({code:0,message:'add user success',data:user});
        }
    });
});
app.delete('/api/user/:id',(req,res)=>{
    let userId=req.params.id;
    let users = require(db);
    users=users.filter((item)=>{
        return item.id!==userId;
    });
    fs.writeFile(db,JSON.stringify(users),(err)=>{
        if(err){
            res.send({code:-1,message:'delete user failed'});
        }else{
            res.send({code:0,message:'delete user success',data:{}});
        }
    })
})

app.listen(3000);
