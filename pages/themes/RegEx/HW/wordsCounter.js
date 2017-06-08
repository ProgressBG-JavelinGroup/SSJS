'use strict';
var makeDivRow = function(output, rowClass, cellsData){
		// the row div
		var row = document.createElement('div');
		// row.classList.add("row");
		row.className = rowClass;

		// the cells divs:
		cellsData.forEach((cellData)=>{
			var cell = document.createElement('div');
			cell.innerHTML = cellData;
			row.appendChild(cell);
		})

		output.appendChild(row);
		// var cell1 = document.createElement('div');
		// cell.innerHTML = cellData;
		// row.appendChild(cell1);

		// var cell2 = document.createElement('div');
		// cell2.innerHTML = obj[key];
		// row.appendChild(cell2);
}
var Aux = function(){
	// methods

	// TODO: aux is not visible in others
	// interface:
	return{
		makeDivRow: makeDivRow,
	}
}
var NumSorter = function(){
	// methods
	var keysByValuesDesc = function(obj){
		 return Object.keys(obj).sort((a,b)=>obj[b]-obj[a]);
	};
	var keysByValuesAsc = function(obj){
		 return Object.keys(obj).sort((a,b)=>obj[a]-obj[b]);
	};
	var keysByKeysDesc = function(obj){
		 return Object.keys(obj).sort((a,b)=> b-a);
	};
	// interface
	return{
		keysByKeysDesc: keysByKeysDesc,
		keysByValuesAsc: keysByValuesAsc,
		keysByValuesDesc: keysByValuesDesc,
	}
}
var Matcher = function(text, pattern) {
	// data
	var pattern  = pattern || /\b[A-Za-z][a-z0-9-]{2,}\b/gi,
		text  = text || "",
		matched =  {};
	// getters/setters
	var getText = ()=>text;
	var getMatched = ()=>matched;
	// methods
	var init = function(text){
		// if we change text => genrate matches
		console.log(`init matcher`);
		try{
			if (this.text ){
				throw "We already have text!"
			}else{
				this.text = text;
				this.matched = this.text.match(pattern);
				console.log(`Matched.matched: `);
				console.dir(this.matched);
				// TODO:  throw error on empty mathched?
			}
		}catch(e){
			console.log(`ERROR: ${e}`);
		}
	};
	// interface
	return{
		getText:getText,
		getMatched:getMatched,
		init:init,
	}
}
var Counter  = function(){
	// data

	// methods
	var countAllWords= function(){
		console.log(`countAllWords() started`);
		var wordsCount = 0;

		// var wordList = {};

		// wordsObj.forEach( (word)=>wordList[word]++ || (wordList[word] = 1) );

		// return	wordList;
	};
	var countSeparateWords= function(wordsObj){
		console.log(`countSeparateWords starts`);

		var wordList = {};

		wordsObj.forEach( (word)=>wordList[word]++ || (wordList[word] = 1) );

		return	wordList;
	}
	// interface
	return{
		countAllWords: countAllWords,
		countSeparateWords: countSeparateWords
	}
}
var Presenter = function(){
	// data

	// methods
	var asTable = function(output, obj){
		console.log(`Presenter.asTable() starts`);
		console.dir(obj);
		// get the order array:
		var orderArr = obj.__order__;

		// clear old content:
		output.innerHTML = "";

		// create the table:
		var table = document.createElement('table');
		var i = 0; // row index

		// make rows:
		for (var i = 0; i < orderArr.length; i++) {
			var key = orderArr[i];

			var j = 0; // column index
			var row = table.insertRow(i);

			var cell = row.insertCell(j++);
			cell.innerHTML = key;
			cell = row.insertCell(j++);
			cell.innerHTML = obj[key];
		}

		// obj.forEach(key=>{
		// 	var j = 0; // column index
		// 	var row = table.insertRow(i++);

		// 	var cell = row.insertCell(j++);
		// 	cell.innerHTML = key;
		// 	cell = row.insertCell(j++);
		// 	cell.innerHTML = obj[key];
		// })

		output.appendChild(table);
	}
	var asDivRows = function(output, obj){
		console.log(`Presenter.asDivRows() starts`);
		console.dir(obj);
		// get the order array:
		var orderArr = obj.__order__;

		// clear old content:
		output.innerHTML = "";

		// make caption:
		// var makeDivRow = function(cellsData){
		makeDivRow(output, "row title",  ["Word", "Count"]);

		// make rows:
		for (var i = 0; i < orderArr.length; i++) {
			var key = orderArr[i];
			makeDivRow(output,"row", [key, obj[key]]);
		}
	}
	// interface
	return{
		asTable: asTable,
		asDivRows: asDivRows,
	}
}

var main = function(){
	function getNodes(){
		var nodes = {};
		console.log(`getNodes starts`);

		nodes.textarea = document.querySelector('#wordsCounter  textarea');
		nodes.select = document.querySelector('#wordsCounter  select');
		nodes.button = document.querySelector('#wordsCounter  button');
		nodes.results = document.querySelector('#results');
		nodes.output = document.querySelector('#results .output');
		nodes.outputHeading = document.querySelector('#results>h2');

		return nodes;
	};

	function atachEventListener(node, eventName, listener){
		console.log(`atachEventListener starts`);
		node.addEventListener( eventName, listener, false );
	}

	function onDOMContentLoaded(){
		console.log(`DOMContentLoaded fired!`);
		// attach events to elements
		atachEventListener(nodes.button, "click", performSelectedAction);
	}

	function getSelectedOption(select){
		console.log(`getSelectedOption() started`);
		try{
			return select[select.selectedIndex].value;
		}catch(e){
			console.warn(`Error: can not getSelectedOption: ${e}`);
		}
	}

	// function getSelectedAction(event){
		// 	if(!event.target.value) {
		// 		console.log(`Please, select an action!`);
		// 	}else{
		// 		console.log(`action: ${event.target.value}`);
		// 	}
	// }

	function performSelectedAction(){
		console.log(`performSelectedAction started`);
		console.dir(counter);

		var action = getSelectedOption(nodes.select);
		// if there is no text processed so far => get and match the new text:
		var text = matcher.getText();
		var matched;
		var countedWordsObj;

		if ( !text){
			var newText = nodes.textarea.value;
			if ( newText ){
				matcher.init(newText.toLowerCase());
				matched = matcher.getMatched();
			}else{
				alert("Plese, enter text to be processed!")
				throw "Error: no text";
			}
		}

		// perform action
		if (  action == undefined || action == ""){
			alert("Choose an action first!");
		}else{
			console.log(`action: ${action}`);
			if ( typeof counter[action] == 'function'){
				countedWordsObj = counter[action](matcher.matched);
			}else{
				console.warn(`Action ${action} is not a function!`);
			}
		}

		// sort the keys array
		var countedWordsSortedArr = numSorter.keysByValuesDesc(countedWordsObj);
		// atach the order into the object:
		countedWordsObj.__order__ = countedWordsSortedArr;
		// show output heading and present results:
		nodes.results.style.display = "block";
		presenter.asDivRows(nodes.output, countedWordsObj);
	}

	// main
	var aux = Aux();
	console.log(`aux in main`);
	console.dir(aux);
	var nodes = getNodes();
	var matcher = Matcher();
	var counter = Counter();
	var numSorter= NumSorter();
	var presenter = Presenter();
	console.dir(`numSorter: ${numSorter}`);
	atachEventListener(document, "DOMContentLoaded", onDOMContentLoaded);
}();



