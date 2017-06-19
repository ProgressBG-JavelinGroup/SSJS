console.time("test");

var subject = {
  events: {
  	'event1': [fn1, fn2],
  },
  // events.subscribe('itemStatusChange', itemStatusChange);
  subscribe: function(eventName, fn){
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  unsubscribe: function(eventName, fn) {
		var handlers = this.events[eventName];
    handlers = handlers.filter(
        function(item) {
            if (item !== fn) {
                return item;
            }
        }
    );
  },
  fire: function(eventName,args, thisObj) {
    var handlers = this.events[eventName];

    handlers.forEach(function(item) {
        item.call(args);
    });
  }
};

var myApp = {
	TODOlist:(function(self={}){
		var items = [
			{content: 'item1', checked: false },
			{content: 'item2', checked: false },
			{content: 'item3', checked: false },
		];
		var nodes = {};
		var itemTemplate = `
			<li {{id}}{{checked}}>{{content}}<i class="fa fa-trash-o"></i></li>
		`;

		var _getItemIndex = function(obj, items){
			var index;
			// https://jsperf.com/map-indexof-vs-findindex
			// index =  items.map(e=>return e.obj[key]).indexOf(obj[vlaue]);
			index = items.findIndex(e=>{
				for(key in obj){
						if(e[key] !== obj[key]){
							return false;
						}
				}
			});
			return index;
		};
		var countDueItems = function(){
			var dueItems = 0;
			for(let item of items){
				if(!item.checked) dueItems++;
			}
			return dueItems;
		};
		var fireItemStatusChange = function(){
			events.fire('itemStatusChange', countDueItems() );
		};
		var getNodes=function(){
			nodes.TODOlist= document.getElementsByClassName("TODOlist")[0];
			nodes.newItemInput= nodes.TODOlist.querySelector(".newItem input");
			nodes.addItemBtn= nodes.TODOlist.querySelector(".newItem .addBtn");
			nodes.itemList= nodes.TODOlist.querySelector("ul");
			nodes.selectAllInput= nodes.TODOlist.querySelector(".selectAll input");
		};
		var bindEvents=function(){
			// in list items:
			nodes.itemList.addEventListener('click', function(e){
				if(e.target){
					if(e.target.nodeName == "I"){
						// click to I.fa items:
						deleteItem(e.target.parentElement);
					}else if (e.target.nodeName === 'LI'){
						//to check/uncheck item:
				    toggleItem(e);
				  };
				}
			});

			//to add new Item button
			nodes.addItemBtn.addEventListener('click',addItem);
		};
		var render = function(tmpl=itemTemplate, items=items){
			nodes.itemList.innerHTML = '';
			items.forEach(function(item, index){
				var itemHTML = itemTemplate;
				var replObj = {};
				// do not create empty TODOS:
				if(!item.content) return true;

				// replace what with what...
				item.checked ? replObj.checked='class="checked"' : replObj.checked='';
				replObj.content=item.content;
				replObj.id = `id="${index+1}"`;

				for(key in replObj){
					itemHTML = itemHTML.replace(new RegExp('{{'+key+'}}','g'), replObj[key]);
				}
				nodes.itemList.innerHTML += itemHTML;
			})
		};
		var toggleItem = function(e){
			itemIndex = e.target.id-1;
			var item = items[itemIndex];

			item.checked = item.checked?false:true;

			render(itemTemplate, items);
			fireItemStatusChange();
		}
		// APIs
		var addItem = function(e){
			var itemContent = typeof e==='string'?e : nodes.newItemInput.value;
			if(!itemContent) return;

			items.push({content: itemContent, checked: false });
			nodes.newItemInput.value = '';

			render(itemTemplate, items);
			fireItemStatusChange();
		};
		var deleteItem = function(e){
			var itemIndex;
			if (typeof e === "number"){
				itemIndex = e;
			}else{
				// itemIndex = _getItemIndex(,items)
				itemIndex = e.id-1;
			}
			items.splice(itemIndex, 1);

			render(itemTemplate, items);
			fireItemStatusChange();
		};

		// MAIN
		getNodes();
		bindEvents();
		render(itemTemplate, items);
		fireItemStatusChange();

		return{
			addItem: addItem,
			deleteItem: deleteItem,
		}
	}),
	TODOstats: (function(self={}){
		var dueItems = 0;
		var nodes = {};
		var dueTemplate = `
			<em>{{dueItems}}</em>
		`;

		var getNodes=function(){
			nodes.stats = document.getElementsByClassName("stats")[0];
			nodes.dueTemplate = nodes.stats.querySelector('.dueTemplate');
		};
		var subscribeObserver=function(){
			events.subscribe('itemStatusChange', itemStatusChange);
		};
		var render = function(tmpl=dueTemplate, replObj){
			nodes.dueTemplate.innerHTML = '';
			var rendered = dueTemplate;
			for(key in replObj){
				rendered = rendered.replace(new RegExp('{{'+key+'}}','g'), replObj[key]);
			}

			nodes.dueTemplate.innerHTML = rendered;
		};
		var itemStatusChange=function(dueItems){
			render(dueTemplate, {dueItems: dueItems});
		}

		// APIs

		// MAIN
		getNodes();
		bindEvents();
		// render(dueTemplate, {dueItems: TODOlist.dueItems});
	}),
	init(){
		// have to be sure that TODOstats will subscribe first, i.e. before TODOlist to fire events
		this.TODOstats = this.TODOstats() || {};
		this.TODOlist = this.TODOlist();
	},
}
myApp.init();

console.timeEnd("test");
