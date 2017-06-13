function compositDecorate(component){
	const protoComp = Object.getPrototypeOf(component);

	function Decorator(component){
		this.component = component;
	}
	Decorator.prototype = Object.create(protoComp);


	//new method
	Decorator.prototype.greetings = function(){
		return 'Good evening';
	};
	//delegated method
	Decorator.prototype.hello = function(){
		return this.component.hello.apply(this.component, arguments);
	};
}

function objectDecorate(component){
	//assign new method to component
	component.greetings = () => {
		console.log(`Howdy`);
	};

	return component;
}

function jQueryDecorator(){
	var decoratorApp = decoratorApp || {};

	// define the objects we're going to use
	decoratorApp = {
    defaults: {
    		bool:false,
        someDefaults: function(){
            console.log( "someDefaults actions" );
        }
    },
    options: {
        bool: true,
        optionsAction: function(){
            console.log( "optionsAction" );
        }
  	},
  	settings: {},

    printObj: function( obj ){
        var arr = [];
        var next;

        $.each( obj, function( key, val ){
            next = key + ": ";
            next += $.isPlainObject(val) ? printObj( val ) : val;
            arr.push( next );
        } );

        return "{ " + arr.join(", ") + " }";
    }

	};

	// merge defaults and options, without modifying defaults explicitly
	decoratorApp.settings = $.extend({}, decoratorApp.defaults, decoratorApp.options);

	$("#log")
	    .append( decoratorApp.printObj(decoratorApp.settings) +
	          + decoratorApp.printObj(decoratorApp.options) +
	          + decoratorApp.printObj(decoratorApp.defaults));
}