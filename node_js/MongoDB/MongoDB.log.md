### 什么是MongoDB
- MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。在高负载的情况下，添加更多的节点，可以保证服务器性能。
- MongoDB旨在为WEB应用提供可扩展的高性能数据存储解决方案
- MongoDB将数据存储为一个文档，数据结构由键值（key=>value）对组成。MongoDB文档类似于JSON对象。字段值可以包含其他文档，数组及文档数组。
### MongoDB的服务启动
- 找到MongoDB安装目录 按下shift+鼠标右键 选择此处打开命令窗口
- 命令窗体中输入 mongod --dbpath=D:\Mongodb\data 按回车键
``` 
注：--dbpath后的值表示数据库文件的存储路径 而且后面的路径必须存在否则服务开启失败
注：这个命令窗体不能关 关闭这个窗口就相当于停止了MongoDB服务
```
- 命令窗体中输入 mongo --host=123.57.143.189 按回车键
``` 
注：--host后的值表示服务器的IP地址
注： --host=123.57.143.189 表示连接IP是123.57.143.189的服务器上的MongoDB数据库 每次数据库都会默认连接test数据库
```
### MongoDB数据库的概念
``` 
SQL术语/概念        MongoDB术语/概念                  解释/说明
database            database                         数据库
table               collection                       数据库表/集合
row                 document                         数据记录行/文档      
column              field                            数据字段/域
index               index                            索引
table joins                                          表连接；MongoDB不支持
primary key         primary key                      主键；MongoDB自动将_id字段设置为主键

```
### 一数据库
- 一个MongoDB中可以建立多个数据库
- MongoDB的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中。
- 数据库也通过名字来表识。数据库名可以是满足以下条件的任意UTF-8字符串
``` 
1.不能是空字符串（“”）
2.不得含有‘ ’（空格） , $ / \和\0(空字符)。
3.应全部小写
4.最多64字节
```
- 有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库。
``` 
1.admin 从权限的角度来看，这是“root”数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
2.local：这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合
3.config：当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。
```
### 二集合
集合就是一组文档的组合。如果将文档类比成数据库中的行，那么集合就可以类比成数据库的表。
在MongoDB中的集合是无模式的，也就是说集合中存储的文档的结构可以是不同的，比如下面的两个文档可以同时存放在一个集合中：
``` 
{"name":"mengxiangyue"}
{"Name":"mengxiangyue","sex":"man"}
注：当第一个文档插入时，集合就会被创建
```
#### 合法的集合命名
- 集合名不能是空字符串“”
- 集合名不能含有\0字符串（空字符），这个字符表示集合名的结尾
- 集合名不能以"system"开头，这是为系统集合保留的前缀。
- 用户创建的集合名字不能含有保留字符，有些驱动程序的确支持在集合名里面包含，这是因为某些系统生成的集合中包含该字符。除非你要访问这种系统创建的集合，否则千万不要在名字里出现$。


### 三文档
文档是MongoDB中的最核心的概念，是其核心单元，我们可以将文档类比成关系型数据库中的每一行数据。
多个键及其关联的值有序的放置在一起就是文档。MOngoDB使用了BSON这种结构来存储数据和网络数据交换。
BSON数据可以理解为在JSON的基础上添加了一些JSON中没有的数据类型。
``` 
{name:"张三",age:20,hobby:["看书"，“旅游”]}
```
需要注意的是：
``` 
1.文档中的键/值对是有序的。
2.文档中的值不仅可以是在双引号里面的字符串，还可以是其他几种数据类型（甚至可以是整个嵌入的文档）
3.MongoDB区分类型和大小写。
```

### MongoDB数据类型
``` 
数据类型         描述
String          字符串。存储数据常用的数据类型。在MongoDB中，UTF-8编码的字符串才是合法的。
Integer         整型数值。用于存储数值。根据你所采用的服务器，可分为32位或64位。
Boolean         布尔值。用于存储布尔值（真/假）。
Double          双精度浮点值，用于存储浮点值
Min/Max keys    将一个值与BSON（二进制的JSON）元素的最低值和最高值相对比
Arrays          用于将数组或列表或多个值存储为一个键
Timestamp       时间戳。记录文档修改或添加的具体时间。
Object          用于内嵌文档
Null            用于创建空值
Symbol          符号。该数据类型基本上等同于字符串类型，但不同的是，他一般用于采用特殊符号类型的语言。
Date            日期时间。用于UNIX时间格式来存储当前日期或时间。
Object ID       对象ID，用于创建文档的ID
Code            代码类型。用于在文档中存储JavaScript代码
Binary Data     二进制数据，用于存储二进制数据。
Regular expression 正则表达式类型，用于存储正则表达式。
```
### MongoDB创建数据库
语法结构
```
use database_name   database_name代表数据库的名字
注：如果数据库不存在，则创建数据库，否则切换到指定数据库
```

### MongoDB 查看所有数据库
语法结构
``` 
show dbs 
注：我们刚创建的数据库person如果不在列表内，要是显示它，我们需要向person数据库插入一些数据，db.person.insert({name:"zhangsan",age:18})
db.person.find({});
查看这个集合下面有多少文档
```
### MongoDB查看当前使用的数据库
语法结构
``` 
db或db.getName()
注：db代表的是当前数据库 也就是person这个数据库
```
### MongoDB删除数据库
语法结构
``` 
db.dropDatabase()
注：db代表的是当前数据库 也就是person这个数据库
```
### MongoDB 断开与MongoDB服务的连接
语法结构
``` 
exit
```
### MongoDB 查看命令API
语法结构
``` 
help
```
### MongoDB 查看集合下面有哪些方法API
语法结构
``` 
db.person.help();
```
### 查看当前数据库下有哪些集合（collection）
``` 
show collections;
```
### 创建集合
``` 
1.使用db.createCollection(collection_Name)方法
collection_Name 集合的名称
2.使用db.collection_Name.insert(document)方法
collection_Name集合的名称 document要插入的文档
```
### 删除当前数据库中的集合（collection）
``` 
db.collection_Name.drop()  
collection_Name 集合的名称
```



