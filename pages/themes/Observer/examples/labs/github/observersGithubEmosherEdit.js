/**
 * The Subject "class"
 */
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

/**
 * The Observer "class"
 */
var Observer = function() {
    // Each observer must implement their own version of notify (because observers will
    // be doing different things).
    // (SS):notification means calling a method of the subscriber object
    this.notify = function() {
        throw "Observer.notify() Not Implemented!";
    }
}


/**
 * MAIN
 */
var news = [];
var s = new Subject();

var a = new Observer();
a.notify = function() {
    console.log(data);
}
var b = new Observer();
b.notify = function() {
    console.log("" + (data*3));
}
var c= new Observer();

// Register the observers
s.registerObserver(a);
s.registerObserver(b);
s.registerObserver(c);

// Loop 4 times, changing the data each time, and notifying observers each time
for (var i = 0; i < 4; i += 1){
    data += 1;
    s.notifyObservers();
}

// Unregister observer a
s.unregisterObserver(a);
// Change the data one last time
data += 1;
// Notify observers of the change
s.notifyObservers();