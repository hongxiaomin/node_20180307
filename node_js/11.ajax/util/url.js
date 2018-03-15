const url = require('url');
//url.parse(url,true)第二个参数是将查询字符串转换为JSON对象
let urlObj=url.parse('http://zfpx:admin@localhost:8080/login?username=zfpx&password=123456',true);
// console.log(urlObj);
console.log(JSON.stringify(urlObj));
// 把一个对象转成字符串
console.log(url.format(urlObj));

/*
* Url {
  protocol: 'http:',协议
  slashes: true,
  auth: 'zfpx:admin',用户名和密码
  host: 'localhost:8080',主机
  port: '8080',端口号
  hostname: 'localhost',主机名
  hash: null,哈希值
  search: '?username=zfpx&password=123456',查询字符串
  query: { username: 'zfpx', password: '123456' },查询参数
  pathname: '/login',路径 端口号和问号中间的部分
  path: '/login?username=zfpx&password=123456',路径与查询字符串
  href: 'http://zfpx:admin@localhost:8080/login?username=zfpx&password=123456' 完整url}
*/
