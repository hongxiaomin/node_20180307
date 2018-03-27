const http = require('http');
const fs = require('fs');
const url = require('url');
const quertStrig = require('querystring');
http.createServer((req,res)=>{
    let urlObj = url.parse(req.url);
    let time = new Date(Date.now()+60*1000).toGMTString();
    let cookieObj = quertStrig.parse(req.headers.cookie,'; ','=');
    if(urlObj.path==='/write'){
        res.writeHead(200,{'set-cookie':'name1=write; path=/write; Expires='+time});
        res.end('Hello World');
    }else if(urlObj.path==='/read'){
        res.writeHead(200,{'Content-Type':'text/txt;charset=utf8','set-cookie':'name2=read; path=/read; Expires='+time});
        res.end('你好');
    }

}).listen(8060);