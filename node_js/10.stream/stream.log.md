# Node.js中的流
### fs模块读写方法

``` 
将文件作为整体读入缓存区  readFile  readFileSync
将数据作为整体写入文件    writeFile writeFileSync
```
### 流的概念
- 流是一组有序的，有起点和终点的字节数据传输手段
- 不关心文件的整体内容，只关注是否从文件中读到了数据，以及读到数据之后的处理
- 流是一个抽象接口，被Node中的很多对象所实现。比如对一个HTTP服务器的请求对象request是一个流，stdout也是一个流。
### stream.readable 可读流
- 使用实现了stream.readable接口的对象来将对象数据读取为流数据，在您表明您准备好接收之前，readable流并不会开始发射数据。
### ReadStream文件可读流
``` 
fs.createReadStream(path,[options]);
```
- path 读取的文件路径
- options 
    * flags 对文件采取何种操作，默认为'r'
    * encoding 指定编码，默认为null
    * start 用整数表示文件开始读取的字节数的索引位置
    * end 用整数表示文件读取的字节数的索引位置（包括end位置）
    * highWaterMark 最高水位线，停止从底层资源读取前内部缓冲区最多能存放的字节数。缺省为64kb
    
### 可读流触发的事件
``` 
data 绑定一个data事件监听器到会将流切换到流动模式，数据会被尽可能的读出
end 该事件会在读完数据后被触发
error 当数据接收时发生错误时触发
```
### 可读流的方法
``` 
setEncoding 指定编码
pause 通知对象停止触发data事件
resume 通知对象恢复触发data事件
pipe 设置管道，将可读流里的内容导入到参数指定的可写流里
```

### writable 可写流
- 使用各种实现stream.writable接口的对象来将流数据写入到对象中 

### 可写流的方法
``` 
write 写入数据
end  结束写入数据时触发，迫使缓存区中的数据立即写入目标对象，调用后不能再写入
```
### writeStream
- 在fs模块中使用createWriteStream方法创建一个将流数据写入文件中writeStream对象
``` 
fs,createWriteStream(path,[options]);
```
- path 读取的文件路径
- options
   * flags 对文件采取何种操作，默认为'w'
   * encoding 指定编码，默认为null
   * start 用整数表示文件开始字节数的写入位置
   * highWaterMark 最高水位线，write()开始返回false的缓冲大小。缺省为16kb
   
### write方法
``` 
writable.write(chunk,[encoding],[callback]);
```
- 参数
    * chunk 要写入的数据，Buffer或字符串对象，必须指定
    * encoding 写入编码，chunk为字符串时有用，可选
    * callback 写入成功后的回调
- 返回值为布尔值，系统缓存区定满时为false，未满时为true

### end方法
- 在写入文件时，当不再需要写入数据时可调用该方法关闭文件。迫使系统缓存的数据立即写入文件中。
``` 
writeable.end(chunk,[encoding],[callback]);
```
### pipe
- 流，尤其是pipe()方法的初衷，是将数据的滞留量限制到一个可接受的水平，以使得不同速度的来源和目标不会淹没可用内存。
``` 
readStream.pipe(writeStream,[options]);
readStream 可读流文件
writeStream 可写流文件
```
