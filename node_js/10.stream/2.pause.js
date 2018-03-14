const fs =require('fs');
let rs=fs.createReadStream('./txt/1.txt',{
    flags:'r',
    encoding:'utf8',
    highWaterMark:1
});
rs.on('data',(data)=>{
    console.log(data);
    rs.pause();
});
rs.on('end',()=>{
    console.log('end')
});

rs.on('error',(err)=>{
    console.log(err);
});

rs.on('dry',()=>{
    rs.resume();
});

