# express
Express是一个简洁、灵活的node.js Web应用开发框架，特提供一系列强大的功能
- 模板解析
- 静态文件服务
- 中间件
- 路由控制
本地或全局安装express
### 路由控制
- get方法 --根据请求路径来处理客户端发出的GET请求
``` 
app.get(path,function(request,response));
path 为请求的路径
第二个参数为处理请求的回调函数，有两个参数分别是request和response，代表请求信息和相应信息。
app.all()函数可以匹配所有的http方法。
```
### 中间件
- 中间件就是处理HTTP请求的函数，用来完成各种特定的任务，比如检查用户是否登录、添加公共方法。
- 它最大的特点就是，一个中间件处理完，可以把相应数据再传递给下一个中间件。
- 如果调用回调函数的next参数表示将请求数据传递给下一个中间件
``` 
app.use([path],function(request,response,next){});//可选参数path默认为“/”
```
### 获取请求参数
- req.host 返回请求头里的主机名（不包括端口号）。
- req.path 返回请求的url的路径名。
- req.query 是一个可获取客户端get请求查询字符串转成的对象，默认为{}。
- req.params 是一个由路径参数组成的对象。

### send
send()方法向浏览器发送响应，并可以智能处理不同类型的数据。并且输出响应时会自动进行一些设置，比如header信息、http缓存支持等等。
- 当参数为一个String时，Content-Type默认设置为“text/html”。
``` 
res.send([body|status],[body]);
```
- 当参数为Array或Object时，Express会返回一个JSON
``` 
res.send({user:'tobi'});//{"user":"tobi"}
```
- 不能使用数字作为参数，如果要返回状态码要用`res.sendStatus`方法

### 模板
1. 指定渲染模板引擎
``` 
app.set('view engine','ejs');
```
2. 设置放模板文件的目录
``` 
app.set('views',path.join(__dirname,'/'));
```
3. render函数，对网页模板进行渲染，在渲染模板时locals可为其模板传入变量值，在模板中就可以调用所传变量了
``` 
res.render(view,[locals],callback)
```
4. 原理
``` 
var tmpl = '<h1>{{name}}</h1><h1>{{age}}</h1>;
var data = {name:'sss',age:11};
var html = tmpl.replace(/\{\{/(\w+)\}\}/g,function(input,group){return data[group]});
```
### 静态文件服务中间件
express.static是Express内置的唯一一个中间件，负责托管Express应用内的静态资源。
- 如果要在网页中加载静态文件（css/js/img）,就需要另外指定一个存放静态文件的目录
- 项目目录下添加一个存放静态文件的目录为public
- 在public目录下再添加三个存放js/css/img的目录，把相关文件放到相应的目录下
- 当浏览器发出文件请求时，服务器端就会到这个目录下去寻找相关文件
``` 
app.use(express.static(require('path').join(__dirname,'public')),{options});
```
### post方法
根据请求路径来处理客户端发出的POST请求
````  
npm install --S body-parser
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.post(path,function(req,res));
````
req.body属性解析客户端的POST请求参数，通过它可获取请求路径的参数值。

### 实现案例 访问控制
- /首页
- get/login 显示登录页
- post/login 登录
- /home 用户主目录

``` 
res.redirect(path)重定向
```

### REST
Resource Representational State Transfer(资源表现层转化)
- 资源（Resource）网络上的一个实体，每种资源对应一个特定的URI
- 表现层（Representation）资源呈现出来的形式叫做表现层
- 状态转化（State Transfer）HTTP协议里面，四个表示操作方式的动词对应四种基本操作
- 某些动词是HTTP动词表示不了的，你就应该把动作做成一种资源
### RESTful API 设计
- 使用HTTP协议
- URL中只有名词
- HTTP动词
    * GET 从服务器获取资源（一项或多项）
    * POST 在服务器新建一个资源
    * PUT 在服务器更新资源（客户端提供改变后的完整资源）。
    * PATCH 在服务器更新资源（客户端提供改变的属性）。
    * DELETE 从服务器删除资源。
- 查询字符中指定过滤条件
    * 当前页
    * 每页数量
    * 过滤关键字
    * 排序字段

- GET/collection:返回资源对象的列表（数组）
- GET/collection/id: 返回单个资源对象
- POST/collection:返回新生成的资源对象
- PUT/collection/id:返回完整的资源对象
- PATCH/collection/id:返回完整的资源对象
- DELETE/collection/id:返回一个空资源

### curl 示例
- 查询所有的用户 curl -v -H 'accept:text/html'
    * http://localhost:8080/users
- 查询指定的用户 curl -v -H 'accept:text/html'
    * http://localhost:8080/users/1
- 添加用户 curl -v -X POST --data "name=sss&age=1"
    * http://localhost:8080/users
- 修改用户（参数为完整的属性）curl -v -X PUT --data "id=1&name=111&age=2"
    * http://localhost:8080/users/1
- 修改用户（参数为变更的属性）curl -v -X PATCH --date "age=3"
    * http://localhost:8080/users/1
- 删除用户 curl -v -X DELETE --data "id=1"
    * http://localhost:8080/users
- 过滤条件
    * http://localhost:8080/users?pageNum=1&pageSize=2&keyword=&sortBy=age

``` 
参数         含义
-H           传递信息 注意key和value之间使用冒号
--data       传递请求值
-X           指定方法
```

