"use strict";
/*
options
object



*/

/*
function linker(elems,elem,index){
    
    if (index == elems.length){

        elems[index -2 ].appendChild(elem);

     return elem;
    }
    else {
        elem.appendChild(elems[index]);
    return linker(elems, elems[index], index+1);   
    }


}
*/
			

var calls = 0;
var ThemeController = function(options){
    
    var view = new View();

    var registeredComponents = {
        mainForm: null
    };


    var Components = {
        Jumbotron: [
            {
                name: "div",
                className: "themeController jumbotron"
            }
        ],
        Jumbotron2: [
            {
                name: "div",
                className: "themeController jumbotron"
            },
            {
                name: "div",
                className: "tester"
            },
            [
                {
                    name: "div",
                    className: "sub1"
                },
                {
                    name: "div",
                    className: "sub2"
                }   
            ]
        ],
        Header: [
            {
                name: "div",
                className: "modal-header"
            },
            [
                {
                    name: "button",
                    attributes: {
                        type: "button",
                        "data-dismiss": "modal",
                        "aria-hidden": true

                    },
                    className: "close",
                    innerText: "x"
                },
                {
                    name:"h4",
                    className: "modal-title",
                    innerText: "Header Controller"
                }
            ],
            {
                //wrapper
                name: "div", className: "modal-footer",
                style:{
                    borderTopWidth: "0px"
                },
                
                
            }
        ],        		
        Footer: function(newHandlers, closeHandlers, saveHandlers){
            
            return [
            {
                name: "div",className: "modal-footer",
                style: {
                    borderTopWidth: "0px"
                }   
            },
            [
                {
                    name: "button", className:"btn btn-primary",innerText:"New",
                    style: {
                        float: "left"
                    },
                    attributes: {
                        type: "button"
                    },
                    handlers: newHandlers

                },
                {
                    name: "button", className:"btn btn-primary",innerText:"Close",
                    
                    attributes: {
                        type: "button"
                    },
                    handlers: closeHandlers
                },
                {
                    name: "button", className:"btn btn-primary",innerText:"Save",
                    
                    attributes: {
                        type: "button"
                    },
                    handlers: saveHandlers
                }
                
            ]
            ];


        },

        Identifier: function(newRuleHandler){
            
            var temp = [];
            temp.push(newRuleHandler);
            return [
            
            
            {
                name: "form", className: "form-horizontal"
            },
            [
                {
                name: "div", className: "b-component"
                },
                [
                    {
                    name: "div", className: "navbar navbar-default",  innerText: "working"
                    },
                    [
                        {
                            name: "div", className: "navbar-header",
                        }
                    ]
                ]
                
                
            ]
           
            
                    
                
            ];

        },
        TestCase: function(paragraphText){

            return [
            {
                name: "div"
            },
            [[
                {
                    name: "p",innerText: paragraphText
                },
                {
                    name: "h4"
                }
            ]]
            ];

        },
        FormWrapper: [
            {
                name: "div", className:"panel-group"
            }
        ],

        CollapseWrapper: [
            {
                name: "div", className: "panel panel-default"

            }
        ],
        CollapseHeader: function(headerText){
            var text = headerText || "default";
            return [            
                {
                    name: "div", className: "panel-heading"
                },
                {
                    name: "h4", className: "panel-title"
                },
                {
                    name: "a", innerText: text,
                    attributes:{
                        "data-toggle": "collapse"
                    }
                }

            ];

        },
        CollapseBody: [
            {
                name: "div", className: "panel-collapse collapse in"
            },
            {
                name: "div", className: "panel-body"
            },
            {
                name:"p"

            },
            {
                name: "p"
            }
        ],
        FormGroup: [
            {
                name: "div",
                className: "form-group"
            }
         
        ],
        CollapseGroup: function(headerText){
            var hText = headerText || "default";
            return [
                {
                    name: "div", className: "panel panel-default",
                    handlers: [

                        {
                            event: "click",
                            callback: function(e){
                                
                                if (e.srcElement.getAttribute("data-toggle") === "collapse"){
                                    
                                    $(this.querySelector("#collapse")).collapse("toggle");
                                }
                            }
                        }

                       
                    ]
                },
                [
                    {
                        name: "div", className: "panel-heading"
                    },
                    [
                        {
                            name: "h4", className: "panel-title"
                        },
                        [
                            {
                                name: "p", innerText: hText,
                                attributes:{
                                    "data-toggle":"collapse"
                                }
                                
                            }
                        ]
                    ]
                ],
                {
                    name: "div", id: "collapse", className: "panel-collapse collapse",
                    attributes: {
                        "aria-expanded":false
                    }

                },                
                {
                    name: "div", className: "panel-body"
                }
                

            ];
            
        }
        

    };

   
        
    
    console.log(Components.CollapseGroup('text'));
    Components["SuperTest"] = function(case2){

        return [
            Components.TestCase("case1"),
            Components.TestCase(case2),
            Components.TestCase("case3")
        ];

    }
        
    
    var EventHandlers = (function(){
        return {
            newRule: function(e){
                e.preventDefault();
                
                //registeredComponents.mainForm
                    //.appendChild(view.Component(Components.CollapseGroup("headerText")).component);
                
                
            },
            newIdentifier: function(e){

                
                registeredComponents.mainForm.last
                    .appendChild(view.Component(Components.Identifier({
                        event: "click",
                        callback: EventHandlers.newRule
                    })).component);
                

            },
            closeController: function(e){
                console.log(e);
            },
            saveControllerChanges: function(e){
                console.log(e);
            }
        }
    }());
    

	


	function View () {


        


        var Builder = function(){
            
        }
        
        Builder.prototype = {
            isElement: function(obj){
              return obj instanceof HTMLElement;  
            },
            isBracket: function(obj){
                return obj.constructor === Array;
            },
            isDoubleBracket: function(obj){
                return obj[0].constructor === Array;
            },
            isObject: function(val){
                if (val === null) { return false;}
                return ( (typeof val === 'function') || (typeof val === 'object') );
            },
            clone: function(obj) {
                var copy;

                // Handle the 3 simple types, and null or undefined
                if (null == obj || "object" != typeof obj) return obj;

                // Handle Date
                if (obj instanceof Date) {
                    copy = new Date();
                    copy.setTime(obj.getTime());
                    return copy;
                }

                // Handle Array
                if (obj instanceof Array) {
                    copy = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        copy[i] = this.clone(obj[i]);
                    }
                    return copy;
                }

                // Handle Object
                if (obj instanceof Object) {
                    copy = {};
                    for (var attr in obj) {
                        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
                    }
                    return copy;
                }

                throw new Error("Unable to copy obj! Its type isn't supported.");
            },
            buildHTMLElement: function(elem){
                var currBinding = {};
                var bindHandler = function(element,handler){
                    console.log(element, handler);
                    element.addEventListener(handler.event, handler.callback,false);
                }
                if (this.isElement(elem)){
                    throw new Error("cannot be a predefined html element");    
                }
                else {
                    if (typeof elem.name === "undefined"){
                        throw new Error("must define element name");   
                    }
                    var element = document.createElement(elem.name);

                    for (var key in elem){
                        
                        if (key === "attributes"){
                            var attributes = elem[key];
                            for (var attr in attributes){
                                element.setAttribute(attr,attributes[attr]);
                            }
                            
                        }
                        else if (key === "name"){

                        }
                        else if (key === "style"){
                            var styles = elem[key];
                            
                            for (var style in styles){
                                element.style[style] = styles[style];    
                            }
                        }
                        else if (key === "bindOn"){

                        }
                        else if (key === "handlers"){
                            console.log(elem);
                            elem.handlers.forEach(function(handler,index){

                                bindHandler(element,handler);    
                            });
                            
                            
                            
                        }
                        else {
                            element[key] = elem[key];    
                        }
                        
                    }
                    
                    return element;
                    
                }
            },
            //accepts an array of dom nodes
            //links elem parent node to elems chain
            //returns nth child node, linked to nth-1 child node
            //only binds arrays of elemnts that are of length 3 or greater
            _linker: function(elems,elem,index){
                        
                if (index >= elems.length){

                    //elems[index -2 ].appendChild(elem);
                    
                    elem = elem || elems[index-2];
                 return elem;
                }
                else {
                    
                    if (this.isBracket(elems[index])){
                        if (this.isDoubleBracket(elems[index])){
                            for (var i = 0; i < elems[index][0].length; i++){
                                elem.appendChild(elems[index][0][i]);    
                            }
                            elem = elems[index][0][0];

                        }
                        else {
                            for (var i = 0; i < elems[index].length; i++){
                               
                                if (elems[index][i].constructor === Array){
                                     var rr = []; 
                                     rr.push(elems[index][i]);
                                    this._linker(rr, elems[index][i-1],0);

                                }
                                else {

                                    elem.appendChild(elems[index][i]);            
                                }
                                
                                
                                
                                
                            }
                            
                           
                        }

                        elems.splice(index,1);
                        if (index === 0){
                            index -= 1;    
                        }
                        else {
                            if (typeof elems[index] !== "undefined"){
                                elem.appendChild(elems[index]);    
                            }
                            
                        }
                        

                    }
                    else {

                        elem.appendChild(elems[index]);

                    }

                    elem = elems[index] || elem;
                    return this._linker(elems, elem, index+1);       
                    
                }


                
            },
            linker: function(components){
                
                var parent = components[0];
                components.splice(0,1);
                var res = this._linker(components,parent,0);
                return {component:parent,last:res};
                /*
                if (index == elems.length){

                    elems[index -2 ].appendChild(elem);

                 return elem;
                }
                else {
                    elem.appendChild(elems[index]);
                return linker(elems, elems[index], index+1);   
                }

                */
            },
            _findComponents: function(arr){
                
                var objectFound = false;
                //look for object on current level
                for (var i =0; i< arr.length; i++){
                    if (this.isObject(arr[i])){
                        objectFound = true;        
                    }
                }
                if (objectFound){
                    for (var i = 0; i<arr.length; i++){
                        //push on component
                        res.push(arr[i]);    
                    }
                    return;
                }
                else {
                    //only arrays here
                    for (var i = 0; i < arr.length; i++){
                        this._findComponents(arr[i]);    
                    }
                }
            },
            findComponents: function(arr){
                
                var res = [];
                var self = this;
                
                (function _findComponents(arr){
                    var objectFound = false;
                    //look for object on current level
                    for (var i =0; i< arr.length; i++){
                        if (self.isObject(arr[i]) && arr[i].constructor !== Array){
                            objectFound = true; 
                            break;       
                        }
                    }
                    if (objectFound){
                        
                        //push copy of component
                        
                        //res.push(JSON.parse(JSON.stringify(arr)));
                        
                        res.push(self.clone(arr));
                        var r = res;
                        return;
                    }
                    else {
                        //only arrays here
                        for (var i = 0; i < arr.length; i++){
                            _findComponents(arr[i]);    
                        }
                    }
                }(arr));
                
                return res;
            },
            /*
            builds array of componet objects into html elements
            modifies original componetArray 
            @param {Array} componentArray
            */
            buildComponentElements: function (componentArray){
                
                
                
                
                
                //console.log(a instaceof Object);
                //for each component object
                for (var i = 0; i < componentArray.length; i++){
                    if (componentArray[i].constructor === Array){
                        this.buildComponentElements(componentArray[i]);
                        
                    }
                    //asserting object, improve
                    else {

                        componentArray[i] = this.buildHTMLElement(componentArray[i]);
                        
                    }
                }
                
                
                
                
            },
            //builds an array of javascript objects
            buildElements: function(arr){

            }
        };
        
        /*
            @param {Array} componentsArray 
        */
        //need to code for possible duplicate object components
		this.Component = function(){
            var builder = new Builder();
            
            
            
            var components = builder.findComponents(Array.prototype.slice.call(arguments));
            
            
            
            /*
            for (var i = 0; i < components.length; i++){
                for (var j = i+1; j < components.length; j++){
                    console.log(components[i] === components[j]);    
                }
            }
            */
            //iterate through and build each component in argument list
            
            try {
                for (var i = 0; i < components.length; i++){
                        
                        builder.buildComponentElements(components[i]);        
                    
                    
                }
                
                
                var res = [];
                
                
                
                for (var i = 0; i < components.length; i++){
                    for (var j = 0; j < components[i].length; j++){
                        
                
                        res.push(components[i][j]);    
                    }
                }
                
                
                
                res = builder.linker(res);
                
                
                
                return res;
                
            }
            catch (e){
                throw new Error(e);   
            }
		}

		this.Component.prototype.constructor = this.Component;
		
		this.Component.prototype = {
			a: function(){
				return 5;
			}
		};
		
	}


	
	


    //register state callbacks

    //generate and append style sheet, keep reference
    var sheet = (function() {
        // Create the <style> tag
        var style = document.createElement("style");

        // Add a media (and/or media query) here if you'd like!
        // style.setAttribute("media", "screen")
        // style.setAttribute("media", "only screen and (max-width : 1024px)")

        // WebKit hack :(
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    })();
    
	

	var Jumbotron = (function() {

        


        var jumbo = view.Component(Components.Jumbotron);
        registeredComponents.mainForm = view.Component(Components.Header);

        //var wrapper = view.Component(Components.Header);
        /*
        registeredComponents.mainForm = view.Component(Components.MainForm({
            event: "click",
            callback: EventHandlers.newRule
        }));
    
        wrapper.last.appendChild(registeredComponents.mainForm.component);
        */
        
        //var FormWrapper = view.Component(Components.FormWrapper);
        //registeredComponents.mainForm.last.appendChild(FormWrapper.component);

        
        //wrapper.last.insertBefore(FormWrapper.component, wrapper.last.childNodes[0]);  
        

        
        //registeredComponents.mainForm = FormWrapper.component;
        var footer = view.Component(Components.Footer(
            [{
                event: "click",
                callback: EventHandlers.newIdentifier
            }],
            [{
                event: "click",
                callback: EventHandlers.closeController
            }],
            [{  
                event: "click",
                callback: EventHandlers.saveControllerChanges
            }]
        ));
        
        jumbo.last.appendChild(registeredComponents.mainForm.component);
        jumbo.last.appendChild(footer.component);

        
        var Collapser = view.Component(Components.CollapseGroup("headerText"));
        console.log(Collapser);
        //registeredComponents.mainForm.appendChild(Collapser.component);


		return jumbo.component;

	})();

	if (options["element"]){
		console.log(options.element);
		options.element.appendChild(Jumbotron);
	}
	
	ThemeController.prototype.addRule = function(ruleName){
		
		sheet.insertRule("kiosk-controller::shadow kiosk-pager { background-color:red; }", 0);
		console.log(sheet);

	}
	
	return this;
}