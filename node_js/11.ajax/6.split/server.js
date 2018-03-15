const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Title</title></head><body><ul>';
    if(req.url==='/'){
        http.get("http://www.yoka.com/fashion/",(response)=>{
            let result='';
            response.on('data',(data)=>{
                result+=data.toString();
            });
            response.on('end',()=>{
                let reg =/<a .+><img.+><\/a>/g;
                let matched = result.match(reg);
                console.log(matched);
                matched.forEach((item)=>{
                    html+=('<li>'+item+'</li>');
                });
                html+='</ul></body></html>';
                res.end(html);
            })
        }).on('error',(err)=>{
            console.log("错误:"+err.message);
        });
    }
}).listen(8080);

/*
* <div class="img"><a href="http://www.yoka.com/fashion/popinfo/2018/0309/51902701090776.shtml"><img src="http://thumb2.yokacdn.com/p?w=373&h=300&cut=1&wt=0&f=http://p4.yokacdn.com/pic/YOKA/2018-03-09/U485P1TS1520590782_40926.jpg" alt="Cole Haan�Ƴ�2.ZER&#216;GRAND with Stitchlite&#8482; ��ӯ��֯Ь��"></a></div>*/

