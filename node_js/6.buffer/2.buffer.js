//buffer 像是一个字节数组
let buf1 = new Buffer(6);//指定Buffer的长度
buf1[0]=2;
buf1.fill(0);//把buffer中的所有元素设置为0
console.log(buf1);

//数组里一定放的是一个数字，范围在0-255之间
let buf2 = new Buffer([1,2,25,15]);
console.log(buf2);

//通过字符串来创建
let buf3 = new Buffer("abc","ascii");
console.log(buf3);
console.log('洪'.charCodeAt(0));
let code='洪'.charCodeAt(0);
console.log(code.toString(2));
let utf8code="1110110 10110100 10101010";
/*
* 1.得到洪的Unicode码。转成二进制
* 2.从后往前依次填入1110xxxx 10xxxxxx 10xxxxxx，不够的补0
* 3.把这个结果转成16进制
* */
let sourceBuf = new Buffer("你好");
let result = new Buffer(6);
sourceBuf.copy(result,0,0,6);
console.log(result.toString());

console.log(Buffer.isBuffer(sourceBuf));
console.log(Buffer.byteLength(sourceBuf,"utf8"));