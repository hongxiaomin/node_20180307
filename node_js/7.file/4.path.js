const  fs = require('fs');
const path = require('path');
//如果是异步方法，最后一个参数一定是回调函数
// fs.mkdirSync('a');
// fs.mkdir('a/b',(err)=>{
//     if(err){
//         throw err;
//     }
// });


function readContent(target){
    fs.readdir(path.resolve(target),(err,files)=>{
        if(err){
            throw err;
        }
       //读取指定目录下面所有的文件，结果是个数组
        files.forEach((file)=>{
            //获得文件的详情描述
            fs.stat(path.resolve(target,file),(err,fileStat)=>{
                //fileStat.isFile() 判断一个文件是文件
                //fileStat.isDirectory()
                if(fileStat.isFile()){
                    fs.readFile(path.resolve(target,file),(err,data)=>{
                        if(err){
                            throw err;
                        }
                        console.log(data.toString());
                    })
                }else if(fileStat.isDirectory()){
                    readContent(path.resolve(target,file));
                }
            });
        })
    });
}
readContent('a');
/*
   * stat{
     size: 4,
     atime: 2018-03-13T06:03:21.822Z,//访问时间
     mtime: 2018-03-13T06:03:21.823Z,//修改时间 只要改过就会变
     ctime: 2018-03-13T06:03:21.859Z,//改变时间 只有内容改了才会变
     birthtime: 2018-03-13T06:03:14.581Z }//创建时间
   * */
