### Mongoose 是什么
Mongoose是MongoDB的一个对象模型工具，是基于node-mongodb-native开发的MongoDB nodejs驱动，可以在异步的环境下执行。同时它也是针对MongoDB操作的一个对象模型库，封装了MongoDB对文档的一些增删改查等常用方法，让NodeJS操作MongoDB数据库变得更加灵活简单。
### 安装使用mongoose：
- 安装mongoose：
``` 
npm install mongoose
```
- 引用mongoose
``` 
const mongoose = require("mongoose");
```
- 使用“mongoose”连接数据库
``` 
 mongoose.connect("mongodb://user:pass@localhost:port/database");
```
- 执行下面代码检查默认数据库test，是否可以正常连接成功
``` 
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test");
let db = mongoose.connection;
db.on("error",(err)=>{
    console.log("数据库连接失败"+err);
});
db.on("open",()=>{
    console.log("数据库连接成功");
})
```
如果我们要通过Mongoose去创建一个“集合”并对其进行增删改查，该怎么实现呢，先了解Schema（数据属性模型）、Model、Entity。
### Schema简述
Schema 一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力，仅仅只是数据库模型在程序片段中的一种表现，可以说是数据属性模型（传统意义的表结构），又或者是“集合”的模型骨架。
``` 
let PersonSchema = new mongoose.Schema({
name:{type:String},
age:{type:Number,default:0},
email:{type:String}
})
基本数据类型有：字符串、日期型、数值型、布尔型（Boolean）、null、数组、内嵌文档等。
```
### Model简述
Model 由Schema构造生成的模型，除了Schema定义的数据库骨架以外，还具有数据库操作的行为，类似于管理数据库属性、行为的类。
``` 
创建Model
let PersonModel = db.model("person",PersonSchema);
```
### Entity
Entity  由Model创建的实体，使用save方法保存数据，Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性。
使用Model创建Entity
``` 
let personEntity = new PersonModel({
name:'hxm',
age:25,
email:'123456@qq.com'
});
```
###查询数据
1.find查询：obj.find(查询条件,callback)；
``` 
Model.find({},(error,doc)=>{
    //若没有向find传递参数，默认的是显示所有文档
})

Model.find({"age":6},(err,doc)=>{
    if(err){
        throw err;
    }else{
        console.log(doc);
    }
})
```

### Model 保存方法
Model提供了一个create方法来对数据进行保存。
1.Model.create(文档数据，callback)
``` 
PersonModel.create({name:'hxm',age:26},(error,doc)=>{
    if(error){
        throw error;
    }else{
        console.log(doc);
    }
})
```
### 数据更新
示例：Model.update(查询条件,更新对象,callback);
``` 
let condition = {name:'hxm'};
let update = {$set:{age:29}};
如果更新全部符合条件的，需加条件
let param = {multi:true};
PersonModel.update(condition,update,param,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('Update success');
    }
})
```
### 删除数据
示例： Model.remove(查询条件，callback);
``` 
let conditions = {name:'hxm'};
PersonModel.remove(condition,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('Delet success');
    }
})
```
## 小结
- 查询：find查询返回符合条件一个、多个或者空数组文档结果。
- 保存：model调用create方法，entity调用save方法
- 更新：model调用update(查询条件，更新对象，callback)，根据条件更新相关数据。
- 删除：model调用remove(查询条件，callback)，根据条件删除相关数据。

### 查询详解
#### 简单查询
属性过滤 find(Conditions,field,callback);
field省略或为null，则返回所有属性。
``` 
返回只包含name、age 两个键的所有记录
Model.find({},{name:1,age:1,_id:0},(err,docs)=>{
    docs查询结果集
})
说明：我们只需要把显示的属性设置为大于零的数就可以了，当然1是最好理解的，_id是默认返回，如果不需要显示加上（"_id":0）,但是，对于其他不需要显示的属性不是_id，如果设置为0的话将会抛异常或查询无果。
```
findOne(查询单条)
与find相同，但只返回单个文档，也就是说当查询到即一个符合条件的数据时，将停止继续查询，并返回查询结果。
findOne(conditions,callback);
``` 
PersonModel.findOne({age:6},(err,doc)=>{
    //查询符合age等于6的第一条数据
    //doc是查询结果
})
```
findById(按ID单条数据)
与findOne相同，但它只接受文档的_id作为参数，返回单个文档。
findById(_id,callback);
``` 
PersonModel.findById(person_id,(err,doc)=>{
    //doc 查询结果文档
})
```

#### 高级查询
$gt、$lt(大于、小于)
- 查询时我们经常会碰到要根据某些字段进行条件筛选查询，比如说Number类型，我们就可以使用$gt(>)、$lt(<)、$lte(<=)、$gte(>=)操作符进行排除性的查询，如下示例：
``` 
Model.find({"age":{"$gt":6}},(err,docs)=>{
    //查询所有age大于6的数据
})；
Model.find({"age":{"$lt":6}},(err,docs)=>{
    //查询所有age小于6的数据
})；

Model.find({"age":{"$gt":6,"$lt":9}},(err,docs)=>{
    //查询所有age大于6小于9的数据
})
```

$ne(不等于)
- $ne(!=)操作符
``` 
Model.find({age:{$ne:6}},(err,docs)=>{
    //查询age不等于6的所有数据
})
```
$ne 可以匹配单个值，也可以匹配不同类型的值。

$in(包含)
和$ne操作相反，$in相当于包含、等于，查询时查找包含指定字段条件的数据。
``` 
Model.find({age:{$in:6}},(error,docs)=>{
    //查询age等于6的所有数据
})
Model.find({age:{$in:[6,7]}},(error,docs)=>{
    //可以把多个值组织成一个数组
})
```

$or(或者)
- $or操作符，可以查询多个键值的任意给定值，只要满足其中一个就可返回，用于存在多个条件判定的情况下使用
``` 
Model.find({"$or":[{"name":"hxm2"},{"age":6}]},(err,docs)=>{
    //查询name为hxm2或age为6的全部文档
})
```

$exists(是否存在)
- $exists操作符，可用于判断某些关键字段是否存在来进行条件查询。
``` 
Model.find({name:{$exists:true}},(error,docs)=>{
    //查询所有存在name属性的文档
})
```

### 游标操作
数据库使用游标返回find的执行结果。客户端对游标的实现通常能够对最终结果进行有效的控制。可以限制结果的数量，略过部分结果，根据任意键按任意顺序的组合对结果进行各种排序，或者是执行其他操作。

最常用的查询选项就是限制返回结果的数量（limit函数）、忽略一点数量的结果（skip函数）以及排序（sort函数）。所有这些选项一定要在查询被发送到服务器之前指定。
#### limit函数的基本用法
在查询操作中，有时数据量会很大，这时我们就需要对返回结果的数量进行限制，那么我们就可以使用limit函数，通过它来限制结果数量。

1.限制数量：find(conditions,fields,options,callback);
``` 
Model.find({},null,{limit:20},(err,docs)=>{
    console.log(docs);
})
如果匹配的结果不到20个，则返回匹配数量的结果，也就是说limit函数指定的是上限而非下限。
```
#### skip函数的基本用法
skip函数和limit类似，都是对返回结果数量进行操作，不同的是skip函数的功能是略过指定数量的匹配结果，返回余下的查询结果。

1.跳过数量:find(conditions,fields,options,callback);
``` 
Model.find({},null,{skip:4},(err,docs)=>{
    console.log(docs);
})
```
#### sort函数的基本用法
sort函数可以将查询结果数据进行排序操作，该函数的参数是一个或多个键/值对，键代表要排序的键名，值代表排序的方向，1是升序，-1是降序
1.结果排序：find(conditions,fields,options,callback);
``` 
Model.find({},null,{sort:{age:-1}},(err,docs)=>{
    //查询所有数据，并按照age降序顺序返回数据docs
})
```



