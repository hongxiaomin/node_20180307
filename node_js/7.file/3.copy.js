const fs = require('fs');
let copy = (src,target)=>{
    fs.readFile(src,{},(err,data)=>{
        if(err){
            throw err;
        }
        fs.writeFile(target,data,{},(err)=>{
            if(err){
                throw err;
            }
        })
    })
};
copy('./img/1.jpg','./img/2.jpg');