const express = require('express');
const path = require('path');
const fs =require('fs');
let app = express();
app.set('view engine','ejs');
app.set('views',__dirname);
app.use((req,res,next)=>{
    res.hxmrender=(tmpl,data)=>{
        fs.readFile(path.join(__dirname,tmpl),'utf8',(err,result)=>{
            result=result.replace(/<%=(\w+)%>/,(input,group1)=>{
                return data[group1];
            });
            res.send(result)
        })
    }
    next();
});
app.get('/',(req,res)=>{
    /*
    * 1.先找到这个模板，然后读出模板的内容
    * 2.把模板中的变量替换成对应的值
    * 3.把最终的HTML返回给客户端
    * */
    res.hxmrender('index.ejs',{
        title:'哈哈哈'
    })
});
app.listen(8080);