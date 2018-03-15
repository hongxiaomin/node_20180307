# 跨域
####垮与资源共享
- XHR2中浏览器选择允许发送合适的CORS（cross-origin resource sharing，跨域资源共享）来跨域请求数据。
- 在标准浏览器中依旧使用XMLHttpRequest对象
#### 设置响应头
- 当浏览器使用跨域资源共享时，服务器都必须在响应头中设置Access-Control-Allow-Origin
``` 
response.writeHead(200,{"Access-Control-Allow-Origin":"*"})
```
- 其中*代码允许任何源请求本服务器。也可以改成固定的源。例如：`{"Access-Control-Allow-Origin":"http://localhost:63342"}`
- 只允许URL为http://localhost:63342的请求源请求本服务器。
