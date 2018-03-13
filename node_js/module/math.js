/*
* 1.每一个JS文件都是一个独立的模块
* 2.模块内部的变量都是私有变量，外部其他模块无法访问
*
*/
function add(a,b){
    return a+b;
}
//向外暴露一个方法
exports.add=add;
