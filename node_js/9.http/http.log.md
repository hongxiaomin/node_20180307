### 服务器
- 服务器可以是专业服务器也可以是个人电脑
- 能在特定（IP）服务器的特定端口上监听客户端的请求，并根据请求的路径返回相应结果都叫服务器

### 客户端
- 只要能向特定（IP）服务器的特定端口发起请求并接受响应的都叫客户端
    * 可以是mac,iphone, ipad, apple 等
    
### 数据在服务器和客户端之间传递
- 可以把服务器硬盘上已经有的静态文件发送给客户端
- 也可以由服务器经过逻辑处理生成的动态内容返回给客户端，比如当前时间
- 一个http事务由一条（从客户端发往服务器的）请求命令和一个（从服务器发回客户端的）响应结果组成
### 传输协议
- 人与人之间通信，需要一种传输手段（声波）和一种彼此都懂的语言（比如普通话）
- 要让这些形形色色的机器能够通过网络进行交互，我们就需要指明一种协议（比如HTTP/HTTPS）和一种数据封装格式（比如HTML/JSON）
- http指的就是这种协议+数据格式的交流体系。
### 一个普通网站访问的过程（1）
- 浏览器（或其他客户端如微信）向服务器发出一个HTTP请求
- 先把域名解析为IP地址（Chrome缓存1分钟（chrome://net-internals/#dns）->搜索操作系统缓存->读取本地host文件->发起DNS系统调用->运营商DNS缓存->找根域->com域）
- 客户端通过随机端口向服务器发起TCP三次握手，建立TCP连接
- 连接建立后浏览器就可以发送HTTP请求了
- 服务器接收到HTTP请求，解析请求的路径和参数，经过后台的一些处理之后生成完整响应页面

### 一个普通网站访问的过程（2）
- 客户端（浏览器）接收到HTTP响应，从请求中得到的HTTP响应体里是HTML代码，于是对HTML代码开始解析
- 解析过程中遇到引用的服务器上的资源（额外的CSS、JS代码，图片、音视频、附件等），再向服务器发送请求
- 浏览器解析HTML包含的内容，用得到的CSS代码进行外观上的进一步渲染，JS代码也可能会对外观进行一定的处理
- 当用户与页面交互（点击，悬停等等）时，JS代码对此作出一定的反应，添加特效与动画
- 交互的过程中可能需要向服务器索取或提交额外的数据（局部的刷新），一般不是跳转就是通过JS代码（响应某个动作或者定时）向服务器发送AJAX请求
- 服务器再把客户端需要的资源返回，客户端用得到的资源来实现动态效果或修改DOM结构。

### 请求
- 请求的方式
    * GET 从服务器获取资源，比如请求一张空白的注册表单
    * POST 向服务器提交数据，比如提交注册表单
- 请求的URL
``` 
http://user:pass@zhufengpeixun.cn:80/node/index.html?type=1#top
http:协议方案名
user:pass:登录信息（认证）
zhufengpeixun.cn:服务器地址
80:服务器端口号
node/index.html:带层次的文件路径
type=1:查询字符串
top:片段表示符
```
- 请求头
    * Content-Type 指定响应内容的类型和编码，浏览器根据这个类型决定如何渲染这个内容，比如显示图片，播放MP3等
- 每条http请求报文都包括一个方法表示本次将要进行何种类型的操作，如读取一个页面，删除一个资源
- get系请求用来从服务器获取数据，没有请求体，不会影响服务器的数据
- post系用来将数据发送到服务器，post会把要发送的数据放到请求体中，可能会影响服务器端的数据
``` 
GET 向服务器获取资源
POST 向服务器发送数据
DELETE 从服务器上删除资源
HEAD 仅向服务器获取相应头，不要响应体
PUT 更新服务器上的一个资源
```
### 报文
- 请求报文
``` 
方法       用法
起始行     请求方法 请求的URL HTTP/协议版本
请求头     通用头+请求头+实体头+扩展头
请求体     发送的数据（get类请求方法请求体为空）
```
- 响应报文
``` 
方法       用法
响应行     HTTP/协议 版本 状态码  状态短语
响应头     通用头+响应头+实体头+扩展头
响应体     相应的数据
```
- 伴随着每个数字状态码，HTTP还会发送一条解释性的原因短语文本
    * 状态码
    ```  
    1xx 请求正在处理
    2xx 正常处理完成
    200 OK 请求成功
    3xx 重定向
    301 Moved Permanently 永久重定向
    302 Found 临时重定向
    4xx 客户端错误
    400 Bad Request 语法错误
    402 Unauthorized 权限未认证
    403 Forbidden 禁止访问
    404 Not Found 资源未找到
    5xx 服务器端错误
    ```
- MIME 类型就是告诉浏览器用什么方式来处理这个数据
- MIME类型是一种文本标记，表示一种主要的对象类型和一个特定的子类型，中间由一条斜杠来分隔。如text/html
- MIME类型在HTTP协议中的表现为Request Header或者Response Header中的Content-Type
``` 
文件类型               MIME类型
html格式的文本文档     text/html
普通的ASCII文本文档    text/plain
JPEG格式的图片         image/jpeg
GIF格式的图片          image/gif
表单                   application/x-www-form-urlencoded
```
#### 创建HTTP服务器并动态响应当前时间
``` 
const http = require('http');//表示加载http模块
//该函数的request参数是一个对象，表示客户端的HTTP请求
//response参数也是一个对象，表示服务器端的HTTP回应
function handle(request,response) {
    //writeHead 表示服务器端回应一个HTTP头信息
    response.writeHead(200,{'COntent-Type':'text/html;charset=utf-8'});
    //response.end方法表示，服务器端回应的具体内容，以及回应完成后关闭本次会话
    response.end(new Date().toLocaleString());
}
//createServer方法接受一个函数作为参数
let server = http.createServer(handle);
//表示启动服务器实例，监听本机的8080端口号
server.listen(8080,"127.0.0.1");
console.log('Server running on port 8080');
```
- 将上面这几行代码保存成文件app.js，然后用node调用这个文件，服务器就开始运行了。
`$node app.js`
- 命令行窗口将显示一行提示“server running on port 8080”
- 打开浏览器，访问`http://localhost:8080`网页显示当前时间。

#### 读取静态文件并返回
``` 
const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    fs.readFile('./index.html',(err,data)=>{//读取当前目录下面的index.html模块
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//写响应码和响应内容格式
        res.end(data);
    })
}).listen(8080,'127.0.0.1');//开始在本机的8080端口上进行监听
console.log('Server running on port 8080');
```
#### 根据不同的请求进行不同的响应（路由）
``` 
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
```
# 处理POST请求
当客户端采用`POST` 方法发送数据时，服务器端可以监听`request`对象的`data`和`end`两个事件。
``` 
const  http = require('http');
http.createServer((req,res)=>{
    let content="";
    console.log(req.headers.name);
    req.on('data',function(chunk){//监听客户端的数据
        content+=chunk;
    });
    req.on('end',function(){//接收完毕
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.write("receive:"+content);
        res.end();
    });

}).listen(8080);
```
data事件会在数据接收过程中，每收到一段数据就触发一次，接收到的数据被传入回调函数，end事件则是在所有数据接收完之后触发。


