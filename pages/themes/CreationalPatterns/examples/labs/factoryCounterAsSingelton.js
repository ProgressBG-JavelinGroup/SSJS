"use strict";

function moduleX(name){
	var count = 1;

	var interFace =  {
		name: name,
		counter: function counter(){
			console.log(count);
		},
	}
	// cache instance
	var instance = interFace;

	// rewrite Factory
	moduleX = function(){
		count++;
		return instance;
	}

	return	interFace;
}


var obj1 = moduleX('obj1');
var obj2 = moduleX('obj2');

obj1.counter(); // 1
obj1.counter(); // 1
obj2.counter(); // 2

obj2.count; 		// Error
obj1.count = 5; // Error
count = 6;     // Error
