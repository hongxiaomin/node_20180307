const http = require('http');
const fs = require('fs');
const url = require('url');
const queryString  = require('querystring');
const SESSION_KEY = 'SESSION_KEY';
let sessions = {};
http.createServer((req,res)=>{
    let urlObj = url.parse(req.url,true);
    let pathname = urlObj.pathname;
    if(pathname==='/'){
        const cookieObj = queryString.parse(req.headers.cookie,';','=');
        let sessionId = cookieObj[SESSION_KEY];
        if(sessionId){
            let balance = sessions[sessionId].balance;
            console.log(balance);
            res.setHeader('Content-Type','text/html;charset=utf8');
            if(balance<15){
                res.end('欢迎你老朋友,你的账户余额不足15元，请充值。');
            }else{
                sessions[sessionId].balance=balance-15;
                res.end('欢迎你老朋友,你的账户余额为'+sessions[sessionId].balance);
            }
        }else{
            //生成一个新的会话ID
            let sId=Date.now()+''+Math.random();
            //在服务器端开辟内存，存放此ID对应的数据
            let sessionObj={balance:100};
            sessions[sId]=sessionObj;
            res.setHeader("Set-Cookie",SESSION_KEY+"="+sId);
            res.setHeader('Content-Type','text/html;charset=utf8');
            res.end('欢迎你新朋友，送你会员卡，余额为'+sessionObj.balance);
        }
    }


}).listen(8060);