var myApp={
	DOMcache: (function(){
		var container = document.getElementsByClassName("container")[0];
		var ul = container.getElementsByTagName("ul");
		var items = ul.children;

		return{
			items: items,
		}
	})(),
	DOMcacheRMP: (function(){
		var ul = document.getElementsByClassName("container")[0];
		var items = ul.children;

		return{
			items: items,
		}
	})(),
	testCache: function(){
		for (var i = 0, len=this.DOMcacheRMP.items.length; i < len; i++){
			let item = this.DOMcacheRMP.items[i];
			console.log(`${item}`);
			item.style.color = "#ff0000";
		}
	}
};

myApp.testCache();