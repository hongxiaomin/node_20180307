/*
* 同步方法的结果通过函数调用返回值来接收
* 异步方法的结果通过把回调函数传进去，然后等结果OK了再通知*/
const math1 = require('./math');
console.log(require.cache);//cache 对象中存放着所有的模块缓存
delete require.cache[require.resolve('./math.js')];//从模块缓存中删除此模块·
const math2 = require('./math');
console.log(math1===math2);
console.log(math1.add(1,2));
console.log(require.resolve('./math'));//获取一个模块的绝对路径

