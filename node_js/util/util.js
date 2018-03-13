const util = require('util');
function Parent(){
    this.name='Parent';
}
Parent.prototype.say=function(){
    console.log(this.name);
};
function Child(){
    this.name='Child';
}
util.inherits(Child,Parent);
let child=new Child();
child.say();
console.log(util.inspect(Child));

let obj = new Object();
obj.name='ggg';
Object.defineProperty(obj,'age',{
    enumerable:false,//可枚举
    value:120,
    configurable:true,//可配置 是否可以删除此属性
    writable:true//是否可改值 是否只读
});
obj.age=150;
for(var attr in obj){
    console.log(attr);
}
console.log(util.inspect(obj,{showHidden:true}));

console.log(util.isError(new Error()));