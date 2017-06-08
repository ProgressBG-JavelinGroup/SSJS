'use strict';

var counter = function(){
	var nodes = {};

	var actions = {
		countAllWords: function(){
				var text = `Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the Galaxy lies a small unregarded yellow sun. Orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant little blue green planet whose ape- descended life forms are so amazingly primitive that they still think digital watches are a pretty neat idea. This planet has or rather had a problem, which was this: most of the people on it were unhappy for pretty much of the time. Many solutions were suggested for this problem, but most of these were largely concerned with the movements of small green pieces of paper, which is odd because on the whole it wasn't the small green pieces of paper that were unhappy. And so the problem remained; lots of the people were mean, and most of them were miserable, even the ones with digital watches. Many were increasingly of the opinion that they'd all made a big mistake in coming down from the trees in the first place. And some said that even the trees had been a bad move, and that no one should ever have left the oceans. And then, one Thursday, nearly two thousand years after one man had been nailed to a tree for saying how great it would be to be nice to people for a change, one girl sitting on her own in a small cafe in Rickmansworth suddenly realized what it was that had been going wrong all this time, and she finally knew how the world could be made a good and happy place. This time it was right, it would work, and no one would have to get nailed to anything. Sadly, however, before she could get to a phone to tell anyone about it, a terribly stupid catastrophe occurred, and the idea was lost forever. This is not her story. But it is the story of that terrible stupid catastrophe and some of its consequences. It is also the story of a book, a book called The Hitch Hiker's Guide to the Galaxy not an Earth book, never published on Earth, and until the terrible catastrophe occurred, never seen or heard of by any Earthman. Nevertheless, a wholly remarkable book. In fact it was probably the most remarkable book ever to come out of the great publishing houses of Ursa Minor of which no Earthman had ever heard either. Not only is it a wholly remarkable book, it is also a highly successful one more popular than the Celestial Home Care Omnibus, better selling than Fifty More Things to do in Zero Gravity, and more controversial than Oolon Colluphid's trilogy of philosophical blockbusters Where God Went Wrong, Some More of God's Greatest Mistakes and Who is this God Person Anyway? In many of the more relaxed civilizations on the Outer Eastern Rim of the Galaxy`;

				var wordPattern = /\b[a-z]{3,}?\b/g;

				var wordList = {};
				if (text.match(wordPattern)){
					text.match(wordPattern)
						.forEach(function(word){
							wordList[word]++ || (wordList[word] = 1);
						});
				}

				// списъкът, сортиран по брой срещания:
				var sortedByValues = Object.keys(wordList)
					.sort((a,b)=>wordList[b]-wordList[a]);

				sortedByValues.forEach(key=>console.log(`${key}: ${wordList[key]}`));
		},
		countSeparateWords: function(){}
	}

	var init = function(){
		console.log(`init starts`);
		function getNodes(){
			console.log(`getNodes starts`);
			if ( Object.keys(nodes).lenght == undefined ) {
				console.log(`Nodes are empty`);
				nodes.textarea = document.querySelector('#wordsCounter  textarea');
				nodes.select = document.querySelector('#wordsCounter  select');
				nodes.button = document.querySelector('#wordsCounter  button');
			}

			return nodes;
		};

		function atachEvents(nodes, actions){
			console.log(`atachEvents starts`);
	                console.dir(this);

			document.addEventListener("DOMContentLoaded", ()=>{
				console.log(`DOMContentLoaded fired!`);
	                        // nodes.select.onchange = getAction;
				nodes.button.onclick = function(actions){
					return	performAction(actions);
				};
				console.dir(this);
			}, false)
		};

		function getAction(event){
			if(!event.target.value) {
				console.log(`Please, select an action!`);
			}else{
				console.log(`action: ${event.target.value}`);
			}
		}

		function performAction(actions){
			console.log(`performAction started`);
			console.dir(actions);
			var action = nodes.select.value;

			if (  action == undefined || action == ""){
				alert("Choose an action first!");
			}else{
				// if ( typeof action == "function")
			}
		}

		function getSelectedOption(select){
			try{
				console.dir(select);
				let selected  = select[select.selectedIndex].value;
				console.log(`selected: ${selected}`);

			}catch(e){
				console.warn(`Error: ${e}`);
			}
		}


		return {
			// nodes: nodes,
			atachEvents: atachEvents,
			performAction: performAction,
			getSelectedOption:getSelectedOption,
		}
	};

	return	{
		init: init,
		nodes: nodes,
		actions: actions,
	}
}();

counter.init();
counter.nodes = init.getNodes();




