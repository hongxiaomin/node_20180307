const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    let url = req.url;
    if(url==='/'){
        fs.createReadStream('./login.html').pipe(res);
    }else if(url==='/login'){//因为用户提交表单的时候会把请求体传过来，所以要接收请求体
        let buffers = [];
        req.on('data',(data)=>{
            buffers.push(data);
        });
        req.on('end',()=>{
            let result = Buffer.concat(buffers);
            res.end(result.toString());
        })
    }
}).listen(8080);