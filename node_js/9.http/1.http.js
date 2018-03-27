const http = require('http');//表示加载http模块
//该函数的request参数是一个对象，表示客户端的HTTP请求
//response参数也是一个对象，表示服务器端的HTTP回应
function handle(request,response) {
    //writeHead 表示服务器端回应一个HTTP头信息
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    //response.end方法表示，服务器端回应的具体内容，以及回应完成后关闭本次会话
    response.end(new Date().toLocaleString());
}
//createServer方法接受一个函数作为参数
let server = http.createServer(handle);
//表示启动服务器实例，监听本机的8080端口号
server.listen(8080,"127.0.0.1");
console.log('Server running on port 8080');
