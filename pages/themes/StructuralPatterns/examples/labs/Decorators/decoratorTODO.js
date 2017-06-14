var car = function(){
	return{
			doors: ()=>3,
			price: ()=>1000,
	}
}
car.prototype.carDecorator = {
	paint: function(){
		var p = this.price();
    this.price = ()=>p + 200;
	}
}

var ford = car();
// ford.__proto__ = car.prototype;
ford = Object.create(car.prototype); // TODO : ???
console.dir(ford);

// // test:
ford.carDecorator.paint.call(ford, 'red');
console.log( ford.price() ); // 1200


// f( obj );
// obj.f();