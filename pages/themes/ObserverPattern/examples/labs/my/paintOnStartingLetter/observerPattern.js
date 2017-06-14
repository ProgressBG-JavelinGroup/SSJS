/**
 * The Subject "class"
 */
var Subject = function () {
    this.observerList = [];
}
Subject.prototype.registerObserver = function(observer) {
    this.observerList.push(observer);
}
Subject.prototype.unregisterObserver = function(observer) {
    // First we find the Observer that wants to be removed
    var index = this.observerList.indexOf(observer);
    // Remove the item from the array
    this.observerList.splice(index, 1);
}
Subject.prototype.notifyObservers = function(params) {
    for (let i = 0, len = this.observerList.length; i < len; i += 1) {
    	this.observerList[i].notify(params);
    }
}


/**
 * The Observer "class"
 */
var Observer = function() {
    // Each observer must implement their own version of notify:
    this.notify = function() {
        throw "Observer.notify() Not Implemented!";
    }
}


