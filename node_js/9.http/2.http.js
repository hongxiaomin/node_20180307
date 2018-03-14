const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    fs.readFile('./index.html',(err,data)=>{//读取当前目录下面的index.html模块
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//写响应码和响应内容格式
        res.end(data);
    })
}).listen(8080,'127.0.0.1');//开始在本机的8080端口上进行监听
console.log('Server running on port 8080');
