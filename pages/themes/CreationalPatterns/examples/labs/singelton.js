var Constructor(){
	var this = {}
	this.prop = 'prop'

	return this;
}

Constructor.prototype.id = 1;

var obj = Constructor();
console.log(`obj.id: ${obj.id}`);
