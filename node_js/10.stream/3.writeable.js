const fs = require('fs');
let ws = fs.createWriteStream('./txt/2.txt',{
    flags:'w',//追加文件并写入  w:清空文件并写入
    start:1,//从第几个字节开始写入
    highWaterMark:5//最高水位线为1
});
/*let flag=ws.write('a');//向流中写入数据
console.log(flag);//如果返回true就表示写入成功*/
let i=0;
let max = 10;


let write=()=>{
    console.log('go on write');
    do{
        var  flag = ws.write(String(i++));
    }while(flag&&i<max);
};
write();
ws.on('drain',()=>{
    console.log('drain');
   write();
});
