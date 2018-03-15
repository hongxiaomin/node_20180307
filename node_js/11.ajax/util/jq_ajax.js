require('jquery');
window.onload=function(){
    $.ajax({
        method:'get',//请求的方法
        url:'/ajax',//请求的url
        data:{name:'sss'},//发送的数据
        processData:true,//是否处理数据，是否把对象转成查询字符串
        dateType:'json',//返回的数据类型
        cache :false,//是否缓存
        async:true,//是否异步
        username:'sss',//用户名
        password:'123456',//密码
        timeout:0,//超时毫秒数
        headers:{name:'sss'},//自定义头
        context:document.querySelector('#content'),//上下文 success error 执行时中的this指向谁
    }).done(function(result){

    }).fail(function(err,headers){

    })
}