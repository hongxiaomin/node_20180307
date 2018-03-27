### 什么是session
session是记录客户状态机制，不同的是cookie保存在客户端浏览器中，而session保存在服务器上。

客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是session。客户端浏览器再次访问时只需要从该session中查找该客户的状态就可以了。

如果说cookie机制是通过检查客户身上的“通行证”来确定客户身份的话，那么session机制就是通过检查服务器上的“客户明细表”来确认客户身份。

session相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

两者的区别：
- cookie数据存放在客户的浏览器上，session数据放在服务器上。
- cookie不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗 考虑到安全应当使用session。
- session会在一定时间内保存在服务器上，当访问增多，会比较占用服务器的性能，考虑到减轻服务器性能方面，应当使用cookie。
- 单个cookie保存的数据不能超过4k，很多浏览器都限制一个站点最多保存20个cookie
所以建议：将登录信息等重要信息存放为session、其他信息如果需要保留，可以放在cookie中

### session的简单应用
``` 
npm install express-session
```
主要的方法就是`session(options)`，其中`options`中包含款参数，主要有：
* name:设置cookie中，保存session的字段名称，默认为connect.sid
* store:session的存储方式，默认存放在内存中，也可以使用Redis，MongoDB等。express生态中都有相应模块的支持
* secret：通过设置的secret字符串，来计算hash值并放在cookie中，使产生的signedCookie防篡改。
* cookie：设置存放session id的cookie的相关选项，默认为(default:{path:'/',httpOnly:true,secure:false.maxAge:null})
* genid:产生一个新的session_id时，所使用的函数，默认使用uid2这个npm包
* rolling：每个请求都重新设置一个cookie，默认为false。
* resave:即使session没有被修改，也保存session值，默认为true。
* saveUninitialized:保存新创建但未修改的session
```  
app.use(require('cookie-parser')('hxm'));
app.use(require('express-session')({secret:'hxm',resave:true,saveUninitialized:true}));
req.session.username='hxm';
console.log(req.session.username);
```

### session
- 会话跟踪，数据存放在服务器端
- 需要借助cookie存储一个会话ID，服务器可以根据会话ID来查询出详细的session数据
### session 步骤
- 在服务器端生成全局唯一标识符（session_id）
- 在服务器内存里开辟此session_id对应的数据存储空间
- 将session_id作为全局唯一标识符通过cookie发送给客户端
- 以后客户端再次访问服务器时会把session_id通过请求头中的cookie发送给服务器

### 存储到mongodb数据库
在上面的示例中，登陆后，重启node APP，然后刷新访问测试页面，session丢失。这是因为session会默认的存储到内存当中。也就是说session数据都是存储在内存当中的，当进程退出后，session数据就会丢失。
* 将session数据持久化存储
在使用MongoDB存储时首先要加载一个模块：connect-mongo
安装命令：`pm install connect-mongo`


