var method1 = function(){
	console.log(`Method 1`);
}

var method2 = function(){
	console.log(`Method 2`);
}

var methodWrapper = function(){
	method1();
	method2();
}