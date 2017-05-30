var nodeTypesCount= {};

function traverseDOM(node){
	// action
	// console.dir(`node: ${node.nodeName}`);
	nodeTypesCount[node.nodeName] = 0;



	// recursion for each children
	var children = node.children;
	for (var i = 0, len = children.length; i<len; i++) {
		traverseDOM(children[i]);
	}
}

function isMemeberOf( array, element){
	array.forEach(function(el){
		return element === el;
	})
}

traverseDOM(document.body);

console.log(`${nodeTypes}`);


