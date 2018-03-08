# 一、先注册一个github用户
```$xslt
https://github.com/join
```

# 二、安装git
在命令行中分别配置用户名和邮箱
```$xslt
git config --global user.name "你的github用户名"
git config --global user.email "你的github邮箱"
```
# 三、初始化仓库
先在任意目录下打开`git-bash`
```$xslt
mkdir git20180307
cd git20180307
git init
```
# 切换目录
```$xslt
pwd 显示当前的工作目录
cd ..切换到上级目录
cd 目录名 切换到下级指定的目录里
cd /e git-bash下切换到E盘的根目录
e: window的CMD下切换到E盘根目录
```

# 工作流
```$xslt
toush 1.txt 创建一个名字叫1.txt的文件
git add 1.txt添加暂存区
git commit -m 'add 1.txt'把1.txt添加历史区
git log查看历史记录
```