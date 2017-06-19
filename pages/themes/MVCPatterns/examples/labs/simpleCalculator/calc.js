// ################ MODEL ################
// data
//
var model = {
	// should come from user
	data: {
		x: 5,
		y: 10,
	},
	res: 0,
	calculate: function(x, y){
		this.res = x+y;
		view.showResult(res);
	},
}


// ################  VIEW  ################
// what user sees
//
var view = {
	nodes: {
		output: document.getElementsByClassName("output")[0],
		input: document.getElementsByClassName("input")[0],
		calcBtn: this.nodes.input.getElementsByClassName('calcBtn')[0],
	},
	showResult: function(n){
		this.nodes.output.innerHTML = n;
	}
}



// ############## CONTROLER ###############
// VIEW <---- CONTROLER ----> MODEL
//
var controler = {
	handlers: {
		'click': function(){
			model.calculate(model.data.x, model.data.y);
		}
	},
	events:{
		'click': function(){
			console.dir(view.nodes.calcBtn);
			view.nodes.calcBtn.addEventListener('click', this.handlers.click);
		}
	},
	bindEvents: function(){
		for(let e in this.events){
			this.events[e]();
		}
	},
	init:function(){

	}
}

controler.bindEvents();

