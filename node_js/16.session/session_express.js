const express = require('express');
const session = require('express-session');

let app = express();
app.use(session({
    secret:'hxm',//加密的秘钥
    resave:true,//每次请求结束，都要重新保存，不管有没有修改
    saveUninitialized:true//保存未修改过的session
}));
app.get('/',(req,res)=>{
    let isLogin = req.session.isLogin;
    if(isLogin){
        res.send('你好老朋友');
    }else{
        req.session.isLogin='true';
        res.send('你好新朋友');
    }
});

app.listen(8060);