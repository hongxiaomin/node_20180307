const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = './users.json';
let app =express();
app.use(bodyParser.urlencoded({extended:true}));
//获取所有的对象列表
app.get('/users',(req,res)=>{
    let keyword = req.query.keyword;
    let sortBy = req.query.sortBy;
    let type = req.query.type==='desc'?1:-1;
    let pageSize = parseInt(req.query.pageSize);
    let pageNum=parseInt(req.query.pageNum);
    let users = require(db);
    users=users.filter((item)=>{
        return item.name.indexOf(keyword)!==-1;
    });
    users=users.sort((a,b)=>{
        return (b[sortBy]-a[sortBy])*type;
    });
    users=users.slice(pageSize*(pageNum-1),pageSize*pageNum);
    res.send(users)
});

app.get('/user/:id',(req,res)=>{
    const userId = Number(req.params.id);
    console.log(userId);
    let users = require(db);
    let user=users.filter((item,index)=>{
        console.log(index);
        console.log(item);
        return item.id===userId;
    })[0];
    console.log(user);
    if(user){
        res.send(user);
    }else{
        res.send({msg:'此用户不存在'})
    }
});
app.post('/users',(req,res)=>{
    let user = req.body;
    var users = require(db);
    user.id=users.length+1;
    users.push(user);
    fs.writeFile(db,JSON.stringify(users),(err)=>{
        if(err){
            throw err;
        }
    });
    res.send(user);
});
//完整更新 请求体里的对象使完整的对象 会整体覆盖原来的对象
app.put('/users/:id',(req,res)=>{
    let users = require(db);
    let user = req.body;
    let userId=Number(req.params.id);
    user.id=userId;
    users=users.map((item,index)=>{
        if(item.id===userId){
            return user;
        }else{
            return item;
        }
    });
    console.log(users);
    fs.writeFile(db,JSON.stringify(users),(err)=>{
        if(err){
            throw err;
        }
    });
    res.send(users);
});
app.patch('/users/:id',(req,res)=>{
    let userId = Number(req.params.id);
    let users = require(db);
    let newUser=req.body;
    users=users.map((item)=>{
        if(item.id===userId){
            for(let key in newUser){
                item[key]=newUser[key];
            }
            newUser=item;
            return item;
        }else{
            return item;
        }
    });
    fs.writeFile(db,JSON.stringify(users),(err)=>{
        if(err){
            throw err;
        }
    });
    res.send(newUser);
});

app.delete('/users/:id',(req,res)=>{
    let users = require(db);
    users=users.filter((item)=>{
        return item.id!==Number(req.params.id);
    });
    fs.writeFile(db,JSON.stringify(users),(err)=>{
        console.log(err);
    });
    res.send({
        msg:'delete success',
        data:{}
    });
});
app.listen(8070);