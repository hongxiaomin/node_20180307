const http = require('http');
http.createServer((req,res)=>{
    if(req.url==='/'){
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.end("主页");
    }else if(req.url==='/upload'){
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.end("上传图片");
    }else{
        res.writeHead(404,{"Content-Type":"text/html;charset=utf-8"});
        res.end("文件不存在");
    }

}).listen(8080);
console.log('哈哈哈');