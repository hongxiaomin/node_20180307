const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    console.log(req.method);
    console.log(req.url);
    console.log(req.httpVersion);
    console.log(req.headers);
    if(req.url==='/'){
        res.writeHead(200,'success',{'Content-Type':'xxx/yyy','Content-Disposition':'xxx/yyy'});
        fs.createReadStream('./xxx/yyy.html').pipe(res);
    }
}).listen(8060);