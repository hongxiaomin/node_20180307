const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    if(req.url==='/'){
        fs.createReadStream('./get.html').pipe(res);
    }else if(req.url==='/ajax'){
        fs.createReadStream('./user.json').pipe(res);
    }
}).listen(8080);