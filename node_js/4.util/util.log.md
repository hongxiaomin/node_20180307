# util 工具类 
``` 
util.inherites(constructor,superConstructor)
inherits 从一个构造函数中继承原型方法到另一个。constructor的原型会被设置到一个从superConstructor创建的新对象上。
superConstructor 可通过constructor.super__属性访问。
子类可以继承父类原型上的方法
注意：不建议使用util.inherits().
```
``` 
util.inspect(object[,options])
·object 任何JavaScript原始值或对象
·options <object>
    。showHidden <boolean>如果为true，则object的不可枚举的符号与属性也会被包括在格式化后的结果中。默认为false。
    。depth <number>指定格式化Object时递归的次数。默认为2。若要无限地递归则传入null
    。colors <boolean>如果为true，则输出样式使用ANSI颜色代码。默认为false。
    。customInspect<boolean>如果为false，则object上自定义的inspect(depth,opts)函数不会被调用。默认为true。
    。showProxy <boolean>如果为true，则Proxy对象的对象和函数会展示他们的target和handler对象。默认为false。
    。maxArrayLength <number>指定格式化时数组和TypedArray元素能包含的最大数量。默认为。设为null，则显示全部数组元素。设为0或负数则不显示数组元素。
    。breakLength <number>一个对象的键被拆分成多行的长度。设为Infinity则格式化一个对象为单行。默认为60.
```
``` 
isArray 
isRegExp
isDate
isError
```

