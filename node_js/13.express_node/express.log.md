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
