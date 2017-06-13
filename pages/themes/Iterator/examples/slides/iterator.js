var testFFIterator = function(){
	function makeIterator(array) {
    var index = 0;

    return {
       next: function() {
           return index < array.length ?
               {value: array[index++], done: false} :
               {done: true};
       }
    };
	};

	var it = makeIterator([1,2,3,4,5]);
	var element;
	while( element = it.next().value){
		console.log(`${element}`);
	}
	// console.log(it.next().value);
	// console.log(it.next().value);
	// console.log(it.next().done);
}

var testSSIterator = function(){
	var agg = (function () {
		var index = 0,
				data = [1, 2, 3, 4, 5],
				length = data.length;
		return {
			next: function () {
				var element;
				if (!this.hasNext()) {
				return null;
				}
				element = data[index];
				index = index + 2;
				return element;
			},
			hasNext: function () {
				return index < length;
			}
		};
	}());

	// this loop logs 1, then 3, then 5
	while (agg.hasNext()) {
		console.log(agg.next());
	}
};

testSSIterator();