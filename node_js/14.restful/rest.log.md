## REST
Resource Representational State Transfer(资源表现层转化)
- 资源（Resource）网络上的一个实体，每种资源对应一个特定的URI
- 表现层（Representation）资源呈现出来的形式叫做表现层
- 状态转化（State Transfer）HTTP协议里面，四个表示操作方式的动词对应四种基本操作
- 某些动词是HTTP动词表示不了的，你就应该把动作做成一种资源
### RESTful API 设计
- 使用HTTP协议
- URL中只有名词
- HTTP动词
    * GET 从服务器获取资源（一项或多项）
    * POST 在服务器新建一个资源
    * PUT 在服务器更新资源（客户端提供改变后的完整资源）。
    * PATCH 在服务器更新资源（客户端提供改变的属性）。
    * DELETE 从服务器删除资源。
- 查询字符中指定过滤条件
    * 当前页
    * 每页数量
    * 过滤关键字
    * 排序字段

- GET/collection:返回资源对象的列表（数组）
- GET/collection/id: 返回单个资源对象
- POST/collection:返回新生成的资源对象
- PUT/collection/id:返回完整的资源对象
- PATCH/collection/id:返回完整的资源对象
- DELETE/collection/id:返回一个空资源

### curl 示例
- 查询所有的用户 curl -v -H 'accept:text/html'
    * http://localhost:8080/users
- 查询指定的用户 curl -v -H 'accept:text/html'
    * http://localhost:8080/users/1
- 添加用户 curl -v -X POST --data "name=sss&age=1"
    * http://localhost:8080/users
- 修改用户（参数为完整的属性）curl -v -X PUT --data "id=1&name=111&age=2"
    * http://localhost:8080/users/1
- 修改用户（参数为变更的属性）curl -v -X PATCH --date "age=3"
    * http://localhost:8080/users/1
- 删除用户 curl -v -X DELETE --data "id=1"
    * http://localhost:8080/users
- 过滤条件
    * http://localhost:8080/users?pageNum=1&pageSize=2&keyword=&sortBy=age

``` 
参数         含义
-H           传递信息 注意key和value之间使用冒号
--data       传递请求值
-X           指定方法
```