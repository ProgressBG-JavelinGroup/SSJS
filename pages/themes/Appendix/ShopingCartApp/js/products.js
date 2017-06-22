var xhrAux = {
	fetchByXHR: {
		get:function(url, readyCb,errorCb){
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() :
					   		new ActiveXObject("Microsoft.XMLHTTP");

			xhr.open("GET", url, true);
			// xhr.setRequestHeader('Content-Type',  'application/x-www-form-urlencoded');

			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				    readyCb(this.responseText);
				};
			};

			xhr.send();
		},
		post:function(url){
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() :
					   		new ActiveXObject("Microsoft.XMLHTTP");

			xhr.open("POST", url, true);
			xhr.setRequestHeader('Content-Type',  'application/x-www-form-urlencoded');

			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				    process(this.responseText);
				};
			};

			xhr.send();
		}
	},
	fetchByFetch: function(url){
  	fetch(url).then(function (response) {
	      response.text().then(function (responseText) {
	        renderHTML(responseText);
	      });
	    });
	},
	JQfetch: function(url, readyCb,errorCb){
		$.ajax({
		  url: "url",
		  context: document.body
		}).done(function() {
		  $( this ).addClass( "done" );
		});
	},
};
var shoppingCartApp=function(){
	var DOMcache = {
		products: document.getElementsByClassName('products')[0],
	}
	var prodURL = '../data/products.json';
	var productTmpl = `
			<div>
				<div>{{name}}</div>
				<div>цена: {{price}}</div>
				<button>купи</button>
			</div>`;
	var prdObj = {
		"id": 1,
		"name": "Product1",
		"price": 1.00,
		"image": {
			"small": "images/small/p1.png",
			"big": "images/big/p1.png",
		},
		"description":{
			"short": "short description of product 1",
			"long": "long description of product 1",
		}
	};
	var getProdList = function(){
		var list = xhrAux.fetchByXHR.get(prodURL, (str)=>str);
	}
	var swapTmpl = function(obj=prdObj, tmpl=productTmpl){
		for(key in obj){
			var re = new RegExp('{{' + key + '}}', 'gim');
			tmpl = tmpl.replace(re, obj[key]);
		}
		return tmpl;
	};
	var renderHTML = function(){
		DOMcache.products.innerHTML = swapTmpl();
	}
	// interface
	return {
		makePage: renderHTML,
	}
};

var sc = shoppingCartApp();
sc.makePage();



