# jsonp
#### 同源策略
同源策略就是规定了JavaScript可以操作那么web内容的一个完整的安全限制。

#### 什么是同源
同源就是规定多个web资源的url中 scheme（协议）、hostname（域名或IP）、port（端口）必须相同，只要有一项不同那么这个web资源就是不同源。
#### 什么是跨域
当请求的资源URL与当前页面的URL中的scheme（协议）、hostname（域名或IP）、port（端口）有一个不同的时候就算是垮与操作。
#### jsonp
- script元素可以作为一种Ajax传输协议
- 只需设置script元素的src属性并且插入到DOM中，浏览器就会发出一个HTTP请求到src属性所指向的URL。
- script不受同源策略的影响
- script元素会自动下载并执行下载的数据
- 使用这种script元素来进行Ajax数据的传输的技术就叫做JSONP，也就是JSON-Padding。
``` 
//服务器不可以返回这样的数据
["baidu","telent","alibaba"]
//服务器会返回一个这样的响应
functionName(["baidu","telent","alibaba"])
其中的functionName必须是在window下可以访问的名称
```