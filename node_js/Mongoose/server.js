const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;
db.on("error",(error)=>{
    console.log(error);
});
db.on("open",()=>{
    console.log("数据连接成功");
});
//数据库的集合结构定义 定义字段的名字和类型
let PersonSchema = new mongoose.Schema({
    name:String,
    age:Number,
    email:String
});
// 定义一个数据库操作模型
let PersonModel = mongoose.model("users",PersonSchema);
//创建实体，可以操作数据库
let personEntity = new PersonModel({
    name:'hxm',
    age:26,
    email:'123456@qq.com'
});

// personEntity.save((err,doc)=>{
//     if(err){
//         throw err;
//     }else{
//         console.log(doc);
//     }
// });

// PersonModel.create({"name":'hxm2',"age":24});
//$inc = increment
// PersonModel.update({name:'hxm2'},{$inc:{age:2}},{multi:true},(error,result)=>{
//     if(error){
//         throw error;
//     }
//     console.log(result);
// });
PersonModel.remove({age:30},(err)=>{
    if(err){
        throw err;
    }
    console.log('Delete success');
    PersonModel.find({},(err,doc)=>{
        if(err){
            throw err;
        }else{
            console.log(doc);
        }
    });
});

