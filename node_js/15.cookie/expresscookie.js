const express = require('express');
const cookieParser = require('cookie-parser');

let app = express();
app.use(cookieParser());
/*
* 当使用了cookieParser中间件后，会多了两个方法或属性
* req.cookies指的是用户提交过来的cookie对象
* res.cookie()用于向客户端写入cookie
* */
app.get('/',(req,res)=>{
   //如果请求中的cookie存在visited，则输出cookie
//    否则，设置cookie字段visited，并设置过期时间为2秒钟
    console.log(req.cookies);
    let isVisited =req.cookies.isVisisted;
    if(isVisited){
        res.send('欢迎老朋友');
    }else{
        res.cookie('isVisisted',1,{maxAge:2*1000});
        res.send('欢迎新朋友')
    }
});
app.listen(8060);