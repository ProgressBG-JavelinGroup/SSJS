// TODO: example with Patterns
var selectors = {
	'even': 'li:nth-child(2n)',
	'odd': 'li:nth-child(2n+1)'
}

var liNodes = {
	'even': [],
	'odd': [],
}

var buttonNodes = {
	'even': document.getElementById('colorEven'),
	'odd' : document.getElementById('colorOdd')
}

// TODO: check at HW;
// buttonNodes.forEach((node)=>node.addEventListener(type, listener ))

var colorInputNode = document.querySelector('input[type="color"]');
function getUserColor(node){
	return node.value;
}

function pushLiNodes(type, liNodes){
	if ( !liNodes[type].length ){
			liNodes[type]
				.push(...document.querySelectorAll(selectors[type]));
	}
	console.dir(liNodes);
}

function setBgColor(nodesArr, color ){
	for (let i = 0, len = nodesArr.length; i < len; i++) {
		nodesArr[i].style.backgroundColor = color;
	}
}

function colorElements(type){
	pushLiNodes(type, liNodes);

	var color = getUserColor(colorInputNode);

	liNodes[type].forEach( function(el){
		el.style.backgroundColor = color;
	})
};

