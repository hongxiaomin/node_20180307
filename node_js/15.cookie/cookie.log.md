### cookie
在web应用中，多个请求之间共享“用户会话”是非常必要的。但是HTTP协议是无状态的。那这时Cookie就出现了。那Cookie又是如何处理呢？
##### Cookie的处理
- 服务端向客户端发送cookie
- 客户端的浏览器把Cookie保存
- 然后在每次请求浏览器都会将Cookie发送到服务端

在HTML文档被发送之前，web服务器通过传送HTTP包头中的Set-cookie消息把一个cookie发送到用户的浏览器中，如下示例：
``` 
Set-Cookie:name=value; Path=/; expires=wednesday, 09-Nov-99 23:12:40 GMT;
```
其中比较重要的属性：
* name=value:键值对，可以设置要保存的Key/Value，注意这里的name不能和其他属性项的名字一样
* Expires:过期时间（秒），在设置的某个时间点后该Cookie就会失效，如expires=wednesday, 09-Nov-99 23:12:40 GMT
* maxAge:最大时效时间（毫秒），设置在多少后失效
* secure：当secure值为true时，cookie在HTTP中是无效，在HTTPS中才有效
* Path:表示cookie影响到的路，如path=/.如果路径不能匹配时，浏览器则不发送这个Cookie
* httpOnly:是微软对cookie做的扩展。如果在cookie中设置了“httpOnly”属性，则通过程序（JS脚本、applet等）将无法读取到Cookie信息，防止XSS攻击产生

### http中的cookie
使用response.writeHead,代码如下：
``` 
var time = new Date(new Date().getTime()+60*1000).toGMTString();
使用response.writeHead(200,{'set-Cookie':'name=hxm; path=/; Expires='+time});
```
缺点：使用response.writeHead只能发送一次头部，即只能调用一次，且不能与response.render共存，否则会报错。
还可以使用response.setHeader,代码示例如下：
``` 
response.setHeader('Set-cookie':'name=hxm; path=/; Expires='+time);
```