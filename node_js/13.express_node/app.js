const express = require('express');
//构建一个express实例
let app = express();
//use 表示使用一个中间件函数
//next是继续下一个函数的意思 next是一个由express提供的函数
app.use((req,res,next)=>{
    console.log('use');
    res.setHeader('Content-Type','text/plain;charset=utf8');
    next();//如果调用表示继续执行下面的路由
});
//请求分发也叫路由 根据不同的路径进行不同的处理
app.get('/index',(req,res)=>{
    console.log(req.path);//路径pathname
    console.log(req.query);//查询字符串对象
    console.log(res.send);//发送的方法
    res.end('Hello World');
});
//处理get请求
app.get('/home',(req,res)=>{
    res.end('哈哈哈')
});
//匹配所有路径
app.all('*',(req,res)=>{
    res.end('404 Not Found');
});
app.listen(8080);