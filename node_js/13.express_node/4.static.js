const express = require('express');
const fs = require('fs');
const path = require('path');
let app =express();
app.use(express.static(path.join(__dirname,'public')));
// app.use((req,res,next)=>{
//     console.log(req.url);
//     fs.createReadStream('.'+req.url).pipe(res);
//     // next();
// });
app.listen(8060);