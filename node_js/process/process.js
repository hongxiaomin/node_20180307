console.log(process.cwd());
process.chdir('..');//回到上级目录
console.log(process.cwd());
console.log(process.memoryUsage());
process.nextTick(function(){
    console.log('ddd');
});
setTimeout(function(){
    console.log('fff');
},100);
setImmediate(function(){
    console.log('rrr')
},100);
/*
{ rss: 25575424, 常驻内存
    heapTotal: 8388608,堆的总内存
    heapUsed: 4339712,堆已经使用的内存
    external: 8224 }
    */
