const http = require('http');
const fs = require('fs');
const url = require('url');
http.createServer((req,res)=>{
    if(req.url==='/'){
        fs.createReadStream('./post.html').pipe(res);
    }else if(req.url==='/post'){
        let contentType = req.headers['content-type'];//获取请求的头部信息全部在req.headers里面
        console.log(contentType);
        let dataBuffer=[];
        req.on('data',(data)=>{
            dataBuffer.push(data);
        });
        req.on('end',()=>{
           let result= Buffer.concat(dataBuffer);
            res.setHeader('Content-Type','application/json');
           res.end(result.toString());
        })
    }else{
        // let urlObj=url.parse(req.url,true);
        // if(urlObj.pathname==='/post'){
        //     let contentType = req.headers['content-type'];//获取请求的头部信息全部在req.headers里面
        //     let query = urlObj.query;
        //     res.end(JSON.stringify(query));
        // }else{
            res.end('Not Found');
        // }
    }
}).listen(8080);