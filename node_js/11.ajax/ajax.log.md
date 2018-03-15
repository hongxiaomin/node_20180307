# ajax
- 第一步创建ajax对象
``` 
var xhr=new XMLHttpRequest();
```
- 第二步 打开请求
``` 
xhr.open(method,url,async,user,password);
参数名            参数含义
method           http方法，例如：POST、GET、PUT等。大小写不敏感
url              请求的URL地址，可以为绝对地址也可以为相对地址
async            布尔型，指定此请求是否为异步方式，默认为true。如果为真，当前状态改变时会调用onreadystatechange属性指定的回调函数
user             如果服务器需要验证，此处指定用户名，默认是undefined
password         验证信息中的密码部分，默认是undefined
```
- 第三部 指定接收响应的回调函数
``` 
当XMLHTTPRequest对象的readyState属性改变时调用回调函数
xhr.onreadystatechange=function(){};
```
#### readyState状态值
``` 
属性               属性含义
0（未初始化）      对象已建立，但是尚未初始化（尚未调用open方法）
1（初始化）        对象已建立，尚未调用send方法
2（发送数据）      send方法已调用，但是当前的状态及HTTP头未知
3（数据传送中）    已接收部分数据，因为响应及HTTP头不全，这时通过responseBody和responseText获取部分数据会出现错误。
4（完成）          数据接收完毕，此时可以通过responseBody和responseText获取完整的回应数据
```
#### 服务器响应
``` 
属性               属性含义
status             http的响应状态码
statusText         表示http的响应状态码描述符
responseText       表示响应主体
```
#### 发送请求
- send 方法把参数放到请求体里
- 所有get系不能传参数，而post可能需要
- 当使用同步的时候 send方法后都会阻塞，一直等到服务器响应，所以send方法要放在最后
``` 
xhr.send(varBody)
```
#### send方法重载参数
```
属性                  属性含义
                      空
DOMString             字符串
FormData              格式化表单数据
```
#### form 标签的enctype属性
``` 
值                                      描述
application/x-www-form-urlencoded       在发送前编码所有字符（默认）
multipart/form-data                     不对字符编码，在使用包含文件上传控件的表单时，必须使用该值。
text/plain                              空格转换为“+”加号，但不对特殊字符编码。
```
#### xhr对象的方法
``` 
方法                                 描述
setRequestHeader(key,value)        设置请求头
getAllResponseHeaders              获取所有的响应头
getResponseHeader(key)             获取指定的响应头
```
#### xhr对象的属性
``` 
属性名                       描述
onreadystatechange          一个当readyState属性改变时会调用的回调函数对象
response                    响应内容，响应实体类型由responseType指定
responseType                修改响应类型
responseText                响应文本
status                      响应状态码
statusText                  响应状态码描述信息
```
#### responseType响应类型
XMLHTTPRequest.responseType 设置该值能够改变响应类型，设置后会把XMLHttpRequest.response转化为相应的类型
``` 
属性名                     描述
“”（空字符串）             字符串（默认值），设置后response和responseText都会是一个字符串
json                       设置后response和responseText都会是一个JSON对象
text                       字符串，设置后response和responseText都会是一个字符串
```

#### jQuery中的ajax
``` 
window.onload=function(){
    $.ajax({
        method:'get',//请求的方法
        url:'/ajax',//请求的url
        data:{name:'sss'},//发送的数据
        processData:true,//是否处理数据，是否把对象转成查询字符串
        dateType:'json',//返回的数据类型
        cache :false,//是否缓存
        async:true,//是否异步
        username:'sss',//用户名
        password:'123456',//密码
        timeout:0,//超时毫秒数
        headers:{name:'sss'},//自定义头
        context:document.querySelector('#content'),//上下文 success error 执行时中的this指向谁
    }).done(function(result){
        
    }).fail(function(err,headers){
        
    })
}
```
