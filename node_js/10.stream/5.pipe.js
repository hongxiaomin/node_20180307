const fs = require('fs');
let copy=(source,target)=>{
   let rs = fs.createReadStream(source);
   let ws = fs.createWriteStream(target);
   rs.pipe(ws);
};
copy('./txt/1.txt','./txt/2.txt');
/*
* response 是可写流
* write end
* fs.createWriteStream('./txt/1.txt').pipe(response);
* */

