// https://github.com/ProgressBG-JavelinGroup/SSJS()
(function(){
	var aux = {
		attachQueryParams: function(params){
			var query = '?';
			for(key in params){
				query += `${key}=${params[key]}&`;
			}
			query = query.replace(/&$/,'');
			return query;
		},
		toJS: {
			fromJSON: (response)=>{
				return JSON.parse(response);
			},
			fromXML:()=>{}
		},
		fromJS:{
			toJSON: (obj)=>{
				JSON.stringify(obj);
			},
			toXML:()=>{}
		},
		DOMcache:{
			output: document.getElementsByClassName('output')[0],
		}
	};
	var gitHubAPI = {
		URL:'https://api.github.com',
		auth:{
			user: 'ProgressBG-JavelinGroup',
		},
		listUserRepos: function(username, params){
			var URL = this.URL+'/users/'+username+'/repos';
			var reposData;
			var repos;

			if (params){
				URL += aux.attachQueryParams(params);
			}

			fetchByFetch(URL);
			// fetchByFetch(URL);
		}
	};
	var fetchByXHR = {
		get: function(url){
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() :
					   		new ActiveXObject("Microsoft.XMLHTTP");

			xhr.open("GET", url, true);

			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				    renderHTML(this.responseText);
				};
			};

			xhr.send();
		},
	};
	var fetchByFetch = function(url){
  	fetch(url).then(function (response) {
      response.text().then(function (responseText) {
        renderHTML(responseText);
      });
    });
	};
	var renderHTML = function(responseText){
		var repos =  aux.toJS.fromJSON(responseText);
      repos && repos.forEach( repo=>{
				aux.DOMcache.output.innerHTML += `<li><span>${repo.name}</span><span>updated at ${repo.updated_at}</span></li>`
			})
	}

	var init = (function(){
		gitHubAPI.listUserRepos('Microsoft',{type:'owner', sort:'updated'});
	})();
})();
