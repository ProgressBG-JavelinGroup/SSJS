var productTmpl = `
	<div>
		<div>{{name}}</div>
		<div>цена: {{price}}</div>
		<button>купи</button>
	</div>`;
var prdObj = {
	name: "Product1",
	price: 1111,
};

var swapTmpl = function(obj=prdObj, tmpl=productTmpl){
	for(key in obj){
		var re = new RegExp('{{' + key + '}}', 'gim');
		tmpl = tmpl.replace(re, obj[key]);
	}
	return tmpl;
};

console.log(swapTmpl());