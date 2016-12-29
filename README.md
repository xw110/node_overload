## 本模块旨在为js开发提供函数重载。

### 安装方法:
1. 下载该模块的全部文件，使用
	`npm install overload` 安装
2. 下载overload.js文件， 工程中引入。

### 使用方法:
###### 基本类型:

	var o = require('overload')

	var test = o.overload({
    "String,String":function(a,b){
        return a + b;
    },
    "Number,Number":function(a,b){
        return a * b;
    },
    "String,Date":function(a,b){
        return a + b.toLocaleString();
    }
	});
 
	console.log(test("hello ","world!"))
	console.log(test(1,2))
	console.log(test("now time is:",new Date()))

#####result:
	hello world!
	3
	now time is:2016-12-28 12:01:50

###### 自定义类型:
    
	var o = require('overload')
	//自定义类型
	function Student(name,age){
	    this.name = name
	    this.age = age
	}
	var test = o.overload({
	    "String,String":function(a,b){
	        return a + b;
	    },
	    "Student,String":function(a,b){
	        return a.name + b;
	    }
	});
 
	console.log(test("hello ","world!"))
	console.log(test(new Student('zs', 23), '你好'))

#####result:
	hello world!
	zs你好