// TODO: upload to slides

function changeColorFactory(color){
	return function(color){
			var boxNode = document.getElementById('box');
			boxNode.style.backgroundColor = color;
		}
}




var colors = ["red", "green", "blue"];

for (var i = 0; i < colors.length; i++) {
	// color[i];
	setTimeout(changeColorFactory(colors[i]), 2000);
}




