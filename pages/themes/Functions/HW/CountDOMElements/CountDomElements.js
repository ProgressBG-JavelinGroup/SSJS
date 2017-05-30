var nodeStat = {}; // 'element' => count

countDOMElements(document.body);

logSortedObjByKeys( nodeStat );


function countDOMElements(node){
	nodeAction(node);

	var childrens = node.childNodes;
	for (var i=0, len=childrens.length; i<len; i++) {
		if( childrens[i].nodeType == 1 ){
			countDOMElements(childrens[i])
		}
	}
}

function nodeAction(node){
	nodeName = node.tagName;

	if( nodeStat[nodeName] == undefined ){
		nodeStat[nodeName] = 1;
	}else {
		nodeStat[nodeName]++;
	}
}

function logSortedObjByKeys( obj ){
	var keys = Object.keys(obj).sort( (a,b) =>  obj[b] - obj[a] );
	keys.forEach( key => console.log( sprintf("%-10s: %3d",key, obj[key] ) ) );
}