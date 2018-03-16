const http = require('http');
let options={
    hostname:'you.163.com',
    port:80,
    method:'get',
    path:'/act/static/Fb2d1OZ714.html'
};
let client=http.request(options,(response)=>{
    // console.log(response);
    //response 也是一个流对象，而且是一个可读流
    let dataStr = '';
    response.on('data',(data)=>{
        dataStr+=data.toString();
    });
    // response.on('error',(err)=>{
    //     throw err;
    // });
    response.on('end',()=>{
        console.log(dataStr);
    })
});
//client是一个流对象 是一个可写流
//当调用end方法的时候才会真正向服务器发起请求
client.end();