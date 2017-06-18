var TODOlist = (function(){
		var items = ['item1', 'item2', 'item3'];
		var nodes = {};
		var itemTemplate = `
			<li>%%item%%<i class="fa fa-trash-o"></i></li>
		`;

		var getNodes=function(){
			nodes.TODOlist= document.getElementsByClassName("TODOlist")[0];
			nodes.newItemInput= nodes.TODOlist.querySelector(".newItem input");
			nodes.addItemBtn= nodes.TODOlist.querySelector(".newItem button");
			nodes.selectAllInput= nodes.TODOlist.querySelector(".selectAll input");
			nodes.itemList= nodes.TODOlist.querySelector("ul");
		};
		var attachEvents=function(){
			// to I.fa items:
			nodes.itemList.addEventListener('click', function(e){
				if(e.target && e.target.nodeName == "I") {
					deleteItem(e.target.parentElement);
				}
			});
			//to add new Item button
			nodes.addItemBtn.addEventListener('click',addItem);
		};
		var render = function(tmpl, items){
			nodes.itemList.innerHTML = '';
			items.forEach(function(item){
				nodes.itemList.innerHTML += itemTemplate.replace(/%%item%%/g, item);
			})
		};
		// APIs
		var addItem = function(e){
			var itemContent = typeof e==='string'?e : nodes.newItemInput.value;

			items.push(itemContent);
			render(itemTemplate, items);
			nodes.newItemInput.value = '';
		};
		var deleteItem = function(e){
			var itemIndex;
			if (typeof e === "number"){
				itemIndex = e;
			}else{
				var itemToRemove = e.textContent.replace(/^\s+|\s+$/g, "");
				itemIndex = items.indexOf(itemToRemove, items)
			}

			items.splice(itemIndex, 1);
			render(itemTemplate, items);
		};

		// MAIN
		getNodes();
		attachEvents();
		render(itemTemplate, items);

		return{
			addItem: addItem,
			deleteItem: deleteItem
		}
})();

var TODOstats ={

}

