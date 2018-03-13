function say(callback){
    callback();
    console.log('say say say');
}
function print(){
    setTimeout(function(){
        console.log('hello world');
    },1000)
}
say(print);