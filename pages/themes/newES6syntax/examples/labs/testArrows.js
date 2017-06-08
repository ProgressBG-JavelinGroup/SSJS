function divide(x, y){
    try{
        if( y === 0 ){
            throw("I would not divide by zero!");
        }else{
            return x/y;
        }
    }catch(e){
    	console.log(e.message);
        console.dir( e );
        return undefined;
    }
}

var res = divide(5, 0);
console.log(`res: ${res}`);
