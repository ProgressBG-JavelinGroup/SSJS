var nodes = {
	subject: document.querySelector('.subject'),
	observers: document.querySelectorAll('.observers>li'),
}

// extend nodes.subject with Subject methods
var augment = function(receiver, giver){
	for( key in giver){
		receiver[key] = giver[key];
	}
}
augment( nodes.subject, new Subject() );


for( let o of nodes.observers){
	// extend observers with Observer methods
	augment( o, new Observer());
	o.notify = function(letter){
		var firstLetter = o.innerHTML.charAt(0);

		if( firstLetter.toLowerCase() == letter.toLowerCase() ){
			console.log(`MATCH`);
			o.style.background = '#F00';
		}else{
			o.style.background = '#FFF';
		}
	};

	// Register the observers to nodes.subject
	nodes.subject.registerObserver(o);
}

nodes.subject.addEventListener('input', (e)=>{
	var letter = e.target.value;

	e.target.notifyObservers(letter);
})