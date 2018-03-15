const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req,res)=>{
    let urlPath = url.parse(req.url);
    if(urlPath.pathname==='/'){
        fs.createReadStream('./index.html').pipe(res);
    }else if(urlPath.pathname==='/ajax'){
        let dataBuffer=[];
        req.on('data',(data)=>{
            dataBuffer.push(data);
        });
        req.on('end',()=>{
            let result=Buffer.concat(dataBuffer);
            res.end(result.toString());
        })
    }
}).listen(8080);