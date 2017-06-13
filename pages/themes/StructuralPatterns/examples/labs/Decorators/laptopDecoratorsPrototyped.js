// The constructor to decorate
function Laptop() {
  this.price = function() { return 1000; };
  this.screenSize = function () { return 13; };
}
Laptop.prototype.memory = function( ) {
	let p = this.price();
  this.price = function() {
    return p + 75;
  };
}
Laptop.prototype.ssd = function() {
	let p = this.price();
  this.price = function() {
    return p + 125;
  };
}

// usage
var thinkPad = new Laptop();
console.log(`init price: ${thinkPad.price()}`);

thinkPad.memory();
thinkPad.ssd();

console.log( thinkPad.price() );
