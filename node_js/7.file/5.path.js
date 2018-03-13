const path = require('path');
//多个部分路径拼成一个最终路径
console.log(path.join(__dirname,'a','b'));
console.log(path.resolve('a','b','..','..'));
console.log(__filename);
console.log(path.basename(__filename,'.js'));//获取当前路径中的文件名
console.log(path.extname(__filename));//获取文件的扩展名
console.log(path.delimiter);//环境变量路径分隔符;:
console.log(path.sep); //目录的分隔符 \ /