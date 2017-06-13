// The Mixin - exports functionalities for vehicles
var Mixin = function (){};
Mixin.prototype = {
    drive(){console.log( "Driving" )},
    ride(){console.log( "Riding" )},
    stop(){console.log( "Stopping" )},
    purr(){console.log("Purr rrr rrpp prr ppprrrr")},
};

// some constructor, which can borrow methods from Mixin
var Bike = function ( settings ) {
    this.model = settings.model || "unknown";
};
var Car = function ( settings ) {
    this.model = settings.model || "unknown";
};

// helper function to extend an object by Mixin:
// augment( Constructor, Mixin, [methodsArray] );
function augment( receiver, giver, methodsArray ){
		// with a list of specified methods:
    if ( methodsArray ){
        methodsArray.forEach(m => {
        	receiver.prototype[m] = giver.prototype[m];
        });
    }
    // with all methods
    else {
        for ( let methodName in giver.prototype ) {
            if ( !Object.hasOwnProperty.call(receiver.prototype, methodName) ) {
                receiver.prototype[methodName] = giver.prototype[methodName];
            }

            // augment by prototype chain:
            // if ( !receiver.prototype[methodName] ) {
            // receiver.prototype[methodName] = giver.prototype[methodName];
            // }
        }
    }
}

// Augment the Bike constructor with some of the Mixin methods:
augment( Bike, Mixin, ["ride", "purr"] );

// Augment the Car constructor with all of the Mixin methods:
augment( Car, Mixin );

// make some objects
var ford = new Car({ model: "Ford" });
console.dir(ford);

var harley = new Bike({ model: "Harley Davidson" });
console.dir(harley);
