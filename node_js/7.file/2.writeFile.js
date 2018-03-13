const fs = require('fs');
//回调函数第一个参数大多是error 对象
fs.writeFile('./2.txt',"中国好舌头",{encoding:'utf8'},(err)=>{
    if(err){
        throw err;
    }
});

let content=fs.writeFileSync('./2.txt',"中国烂舌头",{encoding:'utf8'});