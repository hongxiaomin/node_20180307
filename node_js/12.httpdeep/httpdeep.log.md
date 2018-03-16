#### http模块帮助我们实现HTTP服务器和客户端
命令行中执行
``` 
curl -v http://localhost:8080
curl 是一个获取服务器资源的Linux命令
```
#### http服务器
创建服务器并指定监听请求处理函数
``` 
http.createServer(requestListener(request,response))
```
- request http.IncomingMessage 客户端请求
#### 服务器监听
``` 
server.listen(port,[host],[backlog],[callback])
```
- port 端口
- host 主机
- backlog 等待中的队列数量，默认值是511
- callback 请求到来的时候服务器调用的回调函数

#### http接收客户端数据
http接受客户端请求的第一个参数为http.IncomingMessage对象，有如下的属性
- method 客户端请求的方法
- url 请求时使用的url参数字符串
- headers 请求头对象，包括客户端所有请求头信息，包括cookie
- HttpVersion Http版本

#### 常见请求头信息
从客户端发往服务器发送请求报文所使用的字段，用于补充请求的附件信息
- host 请求的服务器主机。HTTP/1.1请求必须包含主机头，否则会返回400状态码。
- connection 客户端和服务器连接选项
- accept 告诉服务器客户端能够处理的内容类型和优先级 q=表示权重，用分号；分隔，范围是0-1，不指定时权重默认为1
- user-agent 用户代理，是指浏览器或curl，他的信息包括硬件平台、系统软件、应用软件和用户个人偏好
- accept-encoding 高速服务器客户端支持的内容编码及内容编码的优先级顺序
- accept-language 告诉服务器能够处理的语言以及优先级

#### url
把原始URL转成对象
``` 
var urlObj = url.parse('原始的url')
```
urlObj的属性
- href 被转换的源URL字符串
- protocal 客户端请求时的协议
- slashes 在协议与路径中间是否使用//分隔符
- host Url字符串中完整的地址及端口号，可能为IP也可能为主机名
- auth 认证部分
- hostname 主机名或IP
- port 端口号
- pathname 路径不包含查询字符串
- query 不包含起始字符？的查询字符串，或根据该查询字符串转换而成的对象（由parse方法的第二个参数决定，true就会转成对象）

把对象转成URL
``` 
url.format(urlObj);
```
#### 查询字符串
querystring 用来查询字符串进行转换
``` 
var queryobj = querystring.parse(str,[sep],[eq],[options]);//字符串转对象
var  queryStr = querystring.stringify(obj,[sep],[eq]);//对象转字符串
```
- str 需要被转换的查询字符串
- sep 查询字符串中的分割字符，默认为&
- eq 查询字符串中的分配字符，默认参数值为=
- options 为对象参数，可以指定maxKeys属性指写转换后的属性个数。0为不限定

#### 服务器端响应
- response http.ServerResponse 代表服务器响应对象
``` 
response.writeHead(statusCode,[reasonPhrase],[headers]);
* statusCode 状态码
* reasonPhrase 状态码描述信息
* headers 响应头对象
 - Content-Type 内容类型
 - location 重定向到的URL地址
 - content-disposition 下载的文件名
 - content-length 响应内容的字节数
 - set-cookie 写入客户端cookie
 - content-encoding 响应内容的编码方式
 - Cache-Control 缓存
 - Expires 指定缓存过期时间
 - Etag 服务器响应内容没有变化时不重新下载数据
 - connection 默认是keep-alive 保持连接，想断开连接用close
 - date 提供日期和时间标志，说明报文是什么时间创建的
```
#### 设置响应头
-setHeader 方法可以单独设置响应头
```
response.setHeader(name,value);
```
- 如果多个响应头的话可以使用数组
``` 
response.setHeader('Set-cookie',['name=xxx','age=1']);
```
#### 其它响应设置
- getHeader 获取响应头（读取一个在队列中但是还没有被发送至客户端的header。name参数不区分大小写的，它只能在header还没被冲洗掉之前调用。）
- removeHeader 移除响应头
- headersSent 响应头是否已经发送
- sendDate 是否发送响应时间
- statusCode 设置响应码
#### 创建http客户端
request方法可以向其他网站请求数据
- options
    * host 域名或目标主机IP
    * hostname 域名或目标主机IP，优先级比host高
    * port 端口号
    * method 请求方法
    * path 请求的路径，默认为/
    * headers 客户端请求头对象
    * auth 认证信息 如“username：password”
- callback = function(response){}当获取到目标网站所返回的响应流时调用的回调函数

#### 写入请求并发送请求
- write 方法向目标服务器发送数据，write方法可以多次调用
``` 
request.write(chunk,[encoding]);
 - chunk 要发送的数据，可以是Buffer或字符串
 - encoding 编码，不指定时默认是utf8
```
- end方法用来结束本次请求
``` 
request.end(chunk,[encoding]);
```
