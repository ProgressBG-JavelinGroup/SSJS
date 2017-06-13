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