var TODOapp = {
		items: ['item1', 'item2'],
		nodes: {},
		itemTemplate:`
			<li><label><input type="checkbox" name=""></label>%%item%%<i class="fa fa-trash-o"></i></li>
		`,

		getNodes: function(){
			this.nodes.TODOlist= document.getElementsByClassName("TODOlist")[0];
			this.nodes.newItemInput= this.nodes.TODOlist.querySelector(".newItem input");
			this.nodes.addItemBtn= this.nodes.TODOlist.querySelector(".newItem button");
			this.nodes.selectAllInput= this.nodes.TODOlist.querySelector(".selectAll input");
			this.nodes.itemList= this.nodes.TODOlist.querySelector("ul");
		},
		attachEvents: function(){
			// to LI items
			this.nodes.itemList.addEventListener('click', e => {
				if(e.target && e.target.nodeName == "I") {
					this.deleteItem(e.target.parentElement);
				}
			});
			//to add new Item button
			this.nodes.addItemBtn.addEventListener('click',this.addItem.bind(this));
		},
		addItem: function(){
			console.log(`addItem() starts`);
			console.dir(this);
			var itemContent = this.nodes.newItemInput.value || 'No value';
			this.items.push(itemContent);
			this.render();

			this.nodes.newItemInput.value = '';
		},
		deleteItem: function(e){
			var itemToRemove = e.textContent.replace(/^\s+|\s+$/g, "");
			this.items.splice(this.items.indexOf(itemToRemove, this.items), 1);
			this.render();
		},
		render: function(){
			this.nodes.itemList.innerHTML = '';
			this.items.forEach(item=>{
				this.nodes.itemList.innerHTML += this.itemTemplate.replace(/%%item%%/g, item);
			})
		},
		init: function(){
			console.log(`TODOapp init`);
			this.getNodes.call(this);
			this.attachEvents();
			this.render()
			// document.addEventListener("DOMContentLoaded", function(event) {});
		}
};

TODOapp.init();
console.dir(TODOapp);


