const http = require('http');
/*
const querystring = require('querystring');
const postData=querystring.stringify({
    'msg':'Hello World'
});

let options = {
    host:'www.58.com',
    port:80,
    path:'/'
};
let client = http.request(options,(res)=>{
    console.log(`状态码:${res.statusCode}`);
    console.log(`响应头:${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data',(chunk)=>{
        console.log(`响应主体：${chunk}`);
    });
    res.on('end',()=>{
        console.log('响应中已无数据')
    });
});
client.on('error',(e)=>{
    console.error(`请求遇到问题：${e.message}`);
});
client.write(postData);
client.end();*/

http.get("http://www.yoka.com/fashion/",(res)=>{
    console.log("响应"+res.statusCode);
    // console.log(res);
    res.on('data',(data)=>{
        console.log(data.toString());
    })
}).on('error',(err)=>{
    console.log("错误:"+err.message);
});