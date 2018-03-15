const querystring = require('querystring');
let  input = 'username==zfpx@password==1123';
let inputObj=querystring.parse(input,'@','==');
let inputStr=querystring.stringify(inputObj,'&','=');
console.log(inputObj);
console.log(inputStr);