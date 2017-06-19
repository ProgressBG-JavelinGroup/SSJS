// ########################### Observer Pattern
//The Subject "class"
var Subject = function () {
  this.observerList = [];
}
Subject.prototype.registerObserver = function(observer) {
  this.observerList.push(observer);
}
Subject.prototype.registerObservers = function(observerArr) {
	observerArr.forEach( observer=>{
		this.observerList.push(observer);
	});
}
Subject.prototype.unregisterObserver = function(observer) {
  // find the Observer that wants to be removed
  var index = this.observerList.indexOf(observer);
  // Remove it from the array
  this.observerList.splice(index, 1);
}
Subject.prototype.notifyObservers = function(args) {
  for (let i = 0, len = this.observerList.length; i < len; i += 1) {
    this.observerList[i].notify(args);
  }
}

// The Observer "class"
var Observer = function() {
  // notification means calling a method of the subscriber object
  this.notify = function() {
    throw "notify() is not implemented";
  }
}


// ########################### TODOlist API
var TODOlist = (function(){
	var items = 0;
	var addItem= function(){
		items++;
		subject.notifyObservers(items);
	}

	return {
		addNewItem: addItem,
	}
})();

var TODOstats = function(name){
	return {
		showDueCount: function(x){
			console.log(`${name} showDueCount: ${x}`);
		}
	}
};

var TODOstats1 = TODOstats('TODOstats1');
var TODOstats2 = TODOstats('TODOstats2');
var TODOstats3 = TODOstats('TODOstats3');


//create subject:
var subject = new Subject();
subject.registerObservers([TODOstats1, TODOstats2, TODOstats3]);

// create observers
TODOstats1.notify = function(arg){
	console.log(`I, the TODOstats1, notify YOU!`);
	this.showDueCount(arg);
};
TODOstats2.notify = function(arg){
	console.log(`I, the TODOstats2, notify YOU!`);
	this.showDueCount(arg);
};
TODOstats3.notify = function(arg){
	console.log(`I, the TODOstats3, notify YOU!`);
	this.showDueCount(arg);
};


TODOlist.addNewItem();
TODOlist.addNewItem();
TODOlist.addNewItem();

