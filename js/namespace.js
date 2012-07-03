// 声明一个全局对象Namespace，用来注册命名空间
Namespace = new Object();

// 全局对象仅仅存在 register 函数，参数为名称空间全路径，如"Grandsoft.GEA"
Namespace.register = function(fullNS) {
	// 将命名空间切成N部分, 比如 Grandsoft、GEA 等
	var nsArray = fullNS.split('.');
	var sEval = "";
	var sNS = "";
	for ( var i = 0; i < nsArray.length; i++) {
		if (i != 0)
			sNS += ".";
		sNS += nsArray[i];
		// 依次创建构造命名空间对象（假如不存在的话）的语句
		// 比如先创建 Grandsoft，然后创建 Grandsoft.GEA，依次下去
		sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();"
	}
	if (sEval != "")
		eval(sEval);
}
/*
// 注册命名空间Grandsoft.GEA, Grandsoft.GCM
Namespace.register("Grandsoft.GEA");
Namespace.register("Grandsoft.GCM");

// 在Grandsoft.GEA命名空间里面声明类Person
Grandsoft.GEA.Person = function(name, age) {
	this.name = name;
	this.age = age;
}

// 给类Person添加一个公共方法show()
Grandsoft.GEA.Person.prototype.show = function() {
	alert(this.name + " is " + this.age + " years old!");
}

// 演示如何使用类Person
var p = new Grandsoft.GEA.Person("yanglf", 25);
p.show();

*/