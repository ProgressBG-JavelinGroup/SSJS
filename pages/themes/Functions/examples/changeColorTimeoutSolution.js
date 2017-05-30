function changeColorFactory(color){
	return function(color){
			var boxNode = document.getElementById('box');
			boxNode.style.backgroundColor = color;
			console.log(`color in Factory: ${color}`);
		}
}

var colors = ["red", "green", "blue"];

for (var i = 0; i < colors.length; i++) {
	// implement, so that this call to work:
	setTimeout(changeColorFactory(colors[i]), 2000);
}




