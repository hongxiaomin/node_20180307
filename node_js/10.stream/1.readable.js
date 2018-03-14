const fs = require('fs');

let rs=fs.createReadStream('./txt/1.txt',{
    flags:'r',//表示打开文件之后想干什么，默认为人 =read
    encoding:null,//如果值为null，得到的数据是Buffer对象，如果指定编码，那么得到的数据是字符串类型
    start:2,//读取的字节索引的开始位置
    end:5,//读取字节的索引的结束位置
    highWaterMark:64
});
//如果前面没有指定编码，也可以通过setEncoding方法设置
rs.setEncoding('utf8');
//流是EventEmitter的子类
rs.on('data',(data)=>{
   console.log(data);
});

rs.on('end',()=>{
    console.log('end');
});

rs.on('error',(err)=>{//当读取文件出错的时候可以监听error事件
    console.log(err);
});
