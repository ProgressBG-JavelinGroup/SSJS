function scope(x) {
	return
};

var functionCaller = function( f ){
	f();
}

functionCaller( function(){
		console.log(`x = ${x}`);
	} );

