/*
* 1. fs实现文件的读写操作
* */
const fs = require('fs');
let content=fs.readFileSync('./1.txt',{encoding:'utf8'});
// console.log(content);

//所有的异步方法一定要晚于同步方法执行
fs.readFile('./1.txt',{encoding:'utf8'},(err,data)=>{
    if(err){
        throw err;
    }
    console.log(data);
});