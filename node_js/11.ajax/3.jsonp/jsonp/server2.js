const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    if(req.url==='/'){
        fs.createReadStream('./index.html').pipe(res);
    }else if(req.url==='/ajax'){
        res.end('load('+JSON.stringify([{"name":"www"},{"name":"rrr"}])+')');
    }
}).listen(9090);