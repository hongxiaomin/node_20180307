const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');
let db = mongoose.connection;
db.on('error',(error)=>{
    console.log('连接失败');
});
db.on('open',()=>{
    console.log('连接成功');
});

let PersonSchema = new mongoose.Schema({
   name:String,
    age:Number,
    email:String
});

let PersonModel = mongoose.model("persons",PersonSchema);


// PersonModel.create([
//     {name:'hxm1',age:21,email:'123456@qq.com'},
//     {name:'hxm2',age:22,email:'123766@qq.com'},
//     {name:'hxm3',age:23,email:'129456@qq.com'},
//     {name:'hxm4',age:24,email:'453456@qq.com'},
//     {name:'hxm5',age:25,email:'523456@qq.com'},
//     {name:'hxm6',age:26,email:'183456@qq.com'},
//     {name:'hxm7',age:27,email:'133466@qq.com'},
//     {name:'hxm8',age:28,email:'123256@qq.com'},
//     {name:'hxm9',age:29,email:'123424@qq.com'},
// ],(error,doc)=>{
//     if(error){
//         throw error;
//     }
//     console.log(doc);
// });

let personId='5ab9f95d94d6da0b7cde179f';
// PersonModel.findById(personId,(err,doc)=>{
//     console.log(doc);
// });
// PersonModel.find({},null,{limit:5,skip:5,sort:{age:-1}},(err,docs)=>{
//     if(err){
//         throw err;
//     }
//     console.log(docs);
// });


PersonModel.find().sort({name:-1}).skip(6).limit(2).exec((err,docs)=>{
    console.log(docs);
});