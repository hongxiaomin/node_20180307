const fs = require('fs');

let copy=(source,target)=>{
    let rs = fs.createReadStream(source);
    let ws = fs.createWriteStream(target);
    rs.on('data',(data)=>{
        let flag=ws.write(data);
        if(!flag){
            rs.pause();
        }
    });

    ws.on('drain',()=>{
        rs.resume();
    });

    rs.on('end',()=>{
        console.log('read end');
        ws.end();//当读完的时候也要关闭写入的文件
    });

    rs.on('error',(err)=>{
        console.log(err);
    })
};
copy('./txt/1.txt','./txt/2.txt');