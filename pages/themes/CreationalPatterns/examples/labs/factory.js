"use strict";
function moduleX(name){


	function counter(){
		console.log(moduleX.prototype.count++);
	}

	// interface
	return {
		name: name,
		counter: counter,
	}
}

// TODO: same instance should return same count...
moduleX.prototype.count = 1;


var obj1 = moduleX('obj1');
var obj2 = moduleX('obj2');

obj1.counter(); // 1
obj1.counter(); // 1
obj2.counter(); // 2

obj2.count; 		// Error
obj1.count = 5; // Error
// count = 6;     // Error
