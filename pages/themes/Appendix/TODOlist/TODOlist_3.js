var TODOlist = (function(){
		var items = ['item1'];
		var nodes = {};
		var itemTemplate = `
			<li><label><input type="checkbox" name=""></label>%%item%%<i class="fa fa-trash-o"></i></li>
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
		var addItem = function(event){
			var itemContent = typeof event==='string'?
					event:
					nodes.newItemInput.value;
			items.push(itemContent);
			render(itemTemplate, items);
			nodes.newItemInput.value = '';
		};
		var deleteItem = function(e){
			var itemToRemove = e.textContent.replace(/^\s+|\s+$/g, "");
			items.splice(items.indexOf(itemToRemove, items), 1);
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


