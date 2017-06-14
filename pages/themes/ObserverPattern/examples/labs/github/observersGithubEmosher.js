//The Subject "class"
var Subject = function () {
    // The subject's observers are stored as an array.
    this.observerList = [];
}
Subject.prototype.registerObserver = function(observer) {
    // Add the observer to the observerList
    this.observerList.push(observer);
}
Subject.prototype.unregisterObserver = function(observer) {
    // First we find the Observer that wants to be removed
    var index = this.observerList.indexOf(observer);
    // Remove the item from the array
    this.observerList.splice(index, 1);
}
Subject.prototype.notifyObservers = function() {
    for (let i = 0, len = this.observerList.length; i < len; i += 1) {
    	this.observerList[i].notify();
    }
}

// The Observer "class"
var Observer = function() {
 		// notification means calling a method of the subscriber object
    this.notify = function() {
        throw "notify() is not implemented";
    }
}


// THE USE CASE
var data = 0;

// create Subject
var subject = new Subject();

// create Observers
var a = new Observer();
a.notify = ()=> {console.log(data)}
var b = new Observer();
b.notify = ()=> {console.log(data)}

// Register the observers
subject.registerObserver(a);
subject.registerObserver(b);

// use
for (var i = 0; i < 4; i += 1){
    data += 1;
    subject.notifyObservers();
}

// Unregister observer a
subject.unregisterObserver(a);
// change data and notify again
data += 1;
subject.notifyObservers();