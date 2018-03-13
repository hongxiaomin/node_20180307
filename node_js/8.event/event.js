const EventEmitter = require('events');
const util = require('util');
let events = new EventEmitter;
//给对象events注册click事件，
//当click事件发生的时候执行对应的回调函数
events.addListener('click',function(){
    console.log('click');
});
//发射click事件
// events.emit('click');
// events.emit('click');
// events.emit('click');

function Girl(){

}
util.inherits(Girl,EventEmitter);
let girl = new Girl();
let callback=()=>{
    console.log('go to eat');
};
girl.once('hungry',callback);
girl.on('sad',(thing)=>{
    console.log('go to shop '+thing);
});
girl.removeListener('hungry',callback);
girl.emit('hungry');
girl.emit('hungry');
girl.emit('sad','lv');

