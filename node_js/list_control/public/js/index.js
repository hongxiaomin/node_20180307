$(function(){
    var host='http://localhost:3000/api/';
    getUsers();

    $('#add_user').click(function(){
       var name=$('#username').val();
       var age = $('#age').val();
       if(!name||!age){
           alert('请将信息补充完整');
           return;
       }
       postAjax('users','name='+name+'&age='+age,function(data){
           if(data.code===0){
               getUsers();
           }
       },function(err){
           console.log(err);
       })

    });

    $('#user_list').on('click','')



    function getUsers(){
        getAjax('users',function(data){
            $('#user_list').empty();
            data.forEach(function(user){
                $('<li class="list-group-item">'+user.name+':'+user.age+'<div style="float: right"><button class="btn btn-info user_edit" style="margin-right: 10px;">编辑</button><button class="btn btn-warning user_delete">删除</button></div></li>').appendTo($('#user_list'));
            });
        },function(err){
            console.log(err);
        })
    }

    function getAjax(url,sucCb,errCb){
        $.ajax({
            method:'get',
            url:host+url,
            async:true,
            dataType:'json',
            success:function(data){
                sucCb(data);
            },
            error:function(err){
                errCb(err);
            }
        })
    }

    function postAjax(url,data,sucCb,errCb){
        $.ajax({
            method:'post',
            url:host+url,
            data:data,
            async:true,
            dataType:'json',
            success:function(data){
                sucCb(data);
            },
            error:function(err){
                errCb(err);
            }
        })
    }

    function deleteAjax(url,data,sucCb,errCb){
        $.ajax({
            method:'delete',
            url:host+url,
            async:true,
            dataType:'json',
            success:function(data){
                sucCb(data);
            },
            error:function(err){
                errCb(err);
            }
        })
    }

});