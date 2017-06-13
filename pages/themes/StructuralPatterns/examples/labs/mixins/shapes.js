var Circle = function(){};
Circle.prototype = {
  area: function(){
    return Math.PI * this.radius * this.radius;
  }
};

var circle = {
  area: function() {
    return Math.PI * this.radius * this.radius;
  },
};

function extend(destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
}
