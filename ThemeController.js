define(['jquery', 'backbone', 'Loader', 'require'], function($,Backbone,Loader,require){

    //need to add jquery.dom-outline-1.0 dependency

    var loader = new Loader();

    var dfd = $.Deferred();

    //var View = loader.get("View/View");
	//var View = require("../bower_components/View/View");
    //var Backbone = require("../bower_components/backbone/backbone-min.js");
    //var View = require("")
    /*
    var StyleSheet = loader.get("StyleSheet/StyleSheet");

    var Components = {
        MainForm: loader.get("ThemeController/Components/MainForm"),
        Collapse: loader.get("ThemeController/Components/Collapse"),
        RuleCollapse: loader.get("ThemeController/Components/RuleCollapse"),
        AttrEdit: loader.get("ThemeController/Components/AttrEdit"),
        RuleEdit: loader.get("ThemeController/Components/RuleEdit")
        //CollapseExtend: require("./Components/CollapseExtend")

    };
*/


    loader.get(
        "View/View", 
        "StyleSheet/StyleSheet",
        "devbridge-autocomplete/dist/jquery.autocomplete",
        //components
        "ThemeController/Components/MainForm",
        "ThemeController/Components/Collapse",
        "ThemeController/Components/RuleCollapse",
        "ThemeController/Components/AttrEdit",
        "ThemeController/Components/RuleEdit",
        "ThemeController/Components/Minimized"
        ).then(function(
            View, 
            StyleSheet,
            autocomplete,
            MainForm,
            Collapse,
            RuleCollapse,
            AttrEdit,
            RuleEdit,
            Minimized
            ){   

        var Components = {
            MainForm: MainForm,
            Collapse: Collapse,
            RuleCollapse: RuleCollapse,
            AtrrEdit: AttrEdit,
            RuleEdit: RuleEdit,
            Minimized: Minimized
        };
        

        


	var view = new View();

	//var hashmap = require("./hashmap/hashmap");
	//var StyleSheet = require("./StyleSheet/StyleSheet");
	var stylesheet = new StyleSheet();
/*
    stylesheet.addAttribute("div", function(error, state, msg){
        stylesheet.addRule("div", {
            "background-color": "red"
        }, function(error, state, msg){
            stylesheet.addRule("div", {
                "background-color": "blue"
            }, function(error,state,msg){

            });
        });
    });

*/


	

	var mainform = null;

	var NewRuleCallback = function(e){
		e.preventDefault();
		if (e.srcElement.getAttribute('event') === "newRule"){
			var Collapse = view.Component(Components.Collapse());
			var x = mainform.ruleObjects.get(e.currentTarget).tail.appendChild(Collapse.component);	
		}
		

		
		
	}

	var NewCallback = function(e){
		
		e.preventDefault();
		var Collapse = view.Component(Components.RuleCollapse(NewRuleCallback));
		//mainform.ruleObjects.set(Collapse.component, Collapse);
		mainform.tail.appendChild(Collapse.component);
		//console.log('working');
	}

    dfd.resolve(function(options){
		


		mainform = view.Component(Components.MainForm());
        
        options.appendChild(mainform.component);
        
		//mainform["ruleObjects"] = new hashmap();
		/*
		var collapse = view.Component(Components.Collapse());

		form.tail.appendChild(collapse.component);

		collapse = view.Component(Components.Collapse());

		form.tail.appendChild(collapse.component);
		collapse = view.Component(Components.Collapse());

		form.tail.appendChild(collapse.component);
		collapse = view.Component(Components.Collapse());

		form.tail.appendChild(collapse.component);
		collapse = view.Component(Components.Collapse());

		form.tail.appendChild(collapse.component);
		collapse = view.Component(Components.Collapse());

		form.tail.appendChild(collapse.component);
	*/
		
        


		var S = Backbone.Model.extend({});

       
 
        var Styles = Backbone.Collection.extend({
            model: S
        });

        //Theme Creator controller
        var StylesController = Backbone.View.extend({
        	el: mainform.component,
        	component: mainform,
            minimizeComp:view.Component(Components.Minimized()),
            
        	events: {
        		"click #newStyle":"newStyle",
                "click #close":"closeThemeController",
                "click #loadFile":"loadFile",
                "click #exportCSS":"exportCSS",
                "click #exportJSON":"exportJSON",
                "click #minimize":"minimize",
                "click #inspect":"inspect"
        	},
            minimizedState: false,
        	initialize: function(){

                this.collection.on("change", this.collectionChange, this);
                var self = this;
                var altDown = false;
                var downArrow = false;
                var upArrow = false;
                var shiftDown = false;
                document.addEventListener("keydown", function(e){
                    
                    if (e.which == 18){
                        altDown = true;
                    }
                    if (e.which == 40){
                        downArrow = true;
                    }
                    if (e.which == 16){
                        shiftDown = true;
                    }
                    if (e.which == 38){
                        upArrow = true;
                    }
                    if (altDown && (downArrow || upArrow) && shiftDown){
                        
                        self.minimize();
                    }
                    
                }, false);

                document.addEventListener("keyup", function(e){
                    if (e.which == 18){
                        altDown = false;
                    }
                    if (e.which == 40){
                        downArrow = false;
                    }
                    if (e.which == 16){
                        shiftDown = false;
                    }
                    if (e.which == 38){
                        upArrow = false;
                    }
                }, false);
                this.minimize();
        		this.render();
        		
        	},
        	render: function(){
        		this.collection.on("add", this.addStyle, this);
                this.collection.on("change", this.collectionChange, this);
                this.collection.on("destroy", this.collectionChange, this);
        		
        		var self = this;
        		
        		this.collection.models.forEach(function(elem,index){
        			
        			
        			self.addStyle(elem);
        		});

        		return this;
        	},
            collectionChange: function(x,y,z){
                //send ajax
                
            },
            collectionDestroy: function(x,y,z){
                
            },  
        	addStyle: function(elem){
        		
        		//var Collapse = view.Component(Components.RuleCollapse());
        		//this.component.tail.appendChild(Collapse.component);
        		
        		//var childStyleItem = new StyleAttrController({model:elem,el:Collapse.component});
                
                var childStyleItem = new StyleAttrController({model:elem,el:this.component.tail,component:Components.RuleCollapse});
        		
        	},
        	added: function(x){
        		//console.log('added', x);
        		//this.processStyle(x);
        	},
        	newStyle: function(e){
                this.collection.add({});
                /*
        		//this.processStyle()
        		if (e.target.innerText === "NEW"){
                    
        			this.collection.add({});
        		}
        		*/
        		
        		//console.log(e);
        	},
            closeThemeController: function(){

            },
            loadFile: function(e){
                   var target = e.target;
                   var self = this;
                if (target.tagName == "INPUT"){

                }
                else {
                    
                   

                    $( target.firstElementChild ).change(function(e) {
                        console.log(self);
                        //grab the first image in the fileList
                        //in this example we are only loading one file.
                        //console.log(this.files[0].size);
                        //console.log(this.files);
                        //renderImage(this.files[0])
                        var callee = arguments.callee;
                        var reader = new FileReader();

                        reader.onload = function(event){
                            
                            //the_url = event.target.result
                      //of course using a template library like handlebars.js is a better solution than just inserting a string
                            //$('#preview').html("<img src='"+the_url+"' />")
                            // $('#name').html(file.name)
                            // $('#size').html(humanFileSize(file.size, "MB"))
                            // $('#type').html(file.type)
                            
                            if (event.target.result.split(";")[0] != "data:application/json"){
                                toastr.error("File must have a .json extension!");
                                return;
                            }
                            try {
                                var decodedString = atob(event.target.result.split(",")[1]);
                                decodedString = JSON.parse(decodedString);
                            }
                            catch (e){
                                toastr.error("Error decoding file! Try again.");
                            }
                            target.firstElementChild.value = "";
                            self.collection.set(decodedString);
                            
                            $(target.firstElementChild).unbind('change');

                        }
                    
                    //when the file is read it triggers the onload event above.
                        reader.readAsDataURL(this.files[0]);

                    });
                    
                    target.firstElementChild.click();
                }
            },
            exportCSS: function(e){
                //e.stopPropagation();
                //e.preventDefault();

                
                
             
                
                
                //console.log(target);
                
                
            },
            exportJSON: function(e){
                var ret = "[";
                for (var i = 0; i < this.collection.models.length; i++) {
                    if (i+1 == this.collection.models.length){
                        ret += JSON.stringify(this.collection.models[i].attributes);
                    }
                    else {
                        ret += JSON.stringify(this.collection.models[i].attributes)+ ",";    
                    }
                    
                }
                ret += "]";
                
                
                
                var link = document.createElement("a");
                link.download = "Theme.json";
                
                


                


                link.href="data:application/json;base64,"+btoa(ret);
                link.click();

            },
            minimize: function(e){

                
                if (typeof this.minimizeComp.component.parentNode === "undefined" ||
                    this.minimizeComp.component.parentNode == null){
                    $(this.$el[0].parentNode).hide();
                
                

                    document.querySelector('body').appendChild(this.minimizeComp.component);
                    
                    var self = this;

                    this.minimizeComp.component.addEventListener("click", function(e){

                        document.querySelector('body').removeChild(self.minimizeComp.component);
                        $(self.$el[0].parentNode).show();
                        e.currentTarget.removeEventListener('click', arguments.callee);
                        
                    } ,false);
                }
                else {
                    this.minimizeComp.component.click();
                }

                
                
            },
            inspect: function(e){
                var self = this;
                var myDomOutline = DomOutline({ onClick: function(elem){
                    
                    
                    var build = (function buildTargetString(elem){
                        var tag = elem.tagName || elem.nodeName;
                        //build += tag + " ";
                        var next = elem.parentNode || elem.host;
                        if (next && tag != "BODY"){
                            
                            
                            return buildTargetString(next) + tag + " ";

                        }
                        else {
                            return tag + " ";
                        }
                    })(elem);
                    //for shadow dom
                    build = build.replace(/#document-fragment/g, '/deep/');
                    self.collection.add([
                        {attr:build,rules:[],alias:""}
                    ]);
                    //{attr:"body *"}, "rules": [{"font-family":"garamond"}], "alias":"body"}
                    self.minimize();

                    
                },
                elem: "body /deep/ *"
            });

                // Start outline:
                myDomOutline.start();
                this.minimize();
            }

        });
        
        //sub controller, per Style (body *)
        var StyleAttrController = Backbone.View.extend({
        	events: {
        		"click #rule": "addRuleClick",
                "click #SaveStyle": "saveStyle",
                "click #deleteStyle": "deleteStyle"
        	},
        	initialize: function(options){
                var self = this;
                this.model.on("change", this.modelChanged, this);
                this.model.on("change:rules", this.ruleChanged, this);
                this.model.on("delete:rules", this.ruleDelete, this);
                //console.log(options);
                
                var model = this.model.attributes;
                var Collapse = view.Component(options.component(model.alias, model.attr));
                this.component = Collapse;
                
                this.$el[0].appendChild(Collapse.component);

                
                this.setElement(Collapse.component);
                this.render();

        	},
        	render: function(){

        		this.add();
        		
        	},
            ruleChanged: function(newObj,old){
               
                
                if (typeof this.model.attributes.rules === "undefined" ||
                    this.model.attributes.rules == null){
                    this.model.attributes.rules = [];
                }
                else {
                     var found = this.model.attributes.rules.indexOf(newObj);

                   //if newObj isn't on rules array that means new rule
                   if (found === -1){
                    
                    this.model.attributes.rules.push(newObj);
                   }
                }
              

            },
            ruleDelete: function(model){
                
                var rules = this.model.attributes.rules;
                if (typeof rules === "undefined"){

                }
                else {

                    rules.splice(rules.indexOf(model),1);

                    if (rules.length == 0){
                        rules = null;
                    }
                }
                
                
            },
            modelChanged: function(x){
                
                var header = this.$el[0].querySelector("#header");
                var model = this.model.attributes;
                
                header.innerText = typeof model.alias === "undefined"
                    || model.alias == "undefined" || model.alias.length == 0 
                    ? model.attr : model.alias;
            },
            addRule: function(ruleObj){
                var model = this.model;
                
                
                var childStyleRuleController = new StyleRuleController({model:ruleObj,el:this.component.tail,
                            component:Components.Collapse, attr:model.attributes.attr, parentModel: model});

                
            },
            addRuleClick: function(e){
                this.addRule({"No Rule": "undefined"});
            },
        	add: function(){
                var self = this;
        		var model = this.model.attributes;

                var header = this.$el[0].querySelector("#header");
                
                
                header.innerText = typeof model.alias === "undefined"
                    || model.alias == "undefined" || model.alias.length == 0 
                    ? model.attr : model.alias;
                
                if (typeof model.attr === "undefined"
                    || model.attr.length == 0){
                    return;
                }
                
                stylesheet.addAttribute(model.attr, function(err,state,msg){
                    if (err){
                        throw new Error(err);
                    }
                    if (state){
                        toastr.success(msg);
                    }
                    else {
                        toastr.error(msg);
                        return;
                    }

                    model.rules.forEach(function(elem,index){

                        self.addRule(elem);
                        
                        
                        //console.log(elem);
                    });
                });
        		
        	},
            saveStyle: function(e){
                var ruleInput = this.$el[0].querySelector('#ruleInput').value;
                var aliasInput = this.$el[0].querySelector('#aliasInput').value;

                var model = this.model.attributes;
                
                //rule attribute changed
                if (ruleInput !== model.atrr){
                    if (typeof ruleInput !== "undefined" ||
                        typeof model.attr !== "undefined"){
                        stylesheet.changeSelector(model.attr, ruleInput, function(err, state, msg){
                            
                            if (err){
                                toastr.error(err);
                                throw new Error(err);
                            }
                            if (state){
                                toastr.success(msg);
                            }
                            else if (!state){
                                toastr.error(msg);
                            }
                        });
                    }
                    
                    
                }
                //alias attribute changed
                if (aliasInput !== model.alias &&
                    aliasInput !== "undefined"){
                    //this.model.set({alias: aliasInput});
                    toastr.success("Sucessfully changed Alias");
                }
                var rules;
                if (typeof this.model.attributes.rules === "undefined"){
                    rules = null;
                }
                else {
                    rules = this.model.attributes.rules;
                }

                this.model.set({attr:ruleInput, alias: aliasInput, rules: rules});

                


            },
            deleteStyle: function(e){
                var self = this;
                var msg = "Successfully deleted.";
                var error = false;

                var attr = (
                                typeof self.model.attributes.alias === "undefined" ||
                                self.model.attributes.alias == "undefined") ? self.model.attributes.attr : self.model.attributes.alias;

                
                //toastr.success("Sucessfully deleted");
                    
                    
                    self.model.destroy();
                    self.undelegateEvents();
                    self.$el.removeData().unbind();
                    self.remove();
                    Backbone.View.prototype.remove.call(self);
                
                
                    stylesheet.removeAttribute(this.model.attributes.attr, function(err,state,message){
                        if (err){
                            msg = err;
                            error = true;
                            //throw new Error(err);
                        }
                        else {
                            msg = message;
                        }
                            
                        

                        if (error){
                            toastr.error(msg);
                        }
                        else {
                            toastr.success(msg);
                        }
                    });
                
                
               
            }
        });
    
        //sub sub controller, per rule (font-family:garamond)
        var StyleRuleController = Backbone.View.extend({
        	events: {
                //"click #rule": "addRuleClick",
                "click #SaveRule": "saveRule",
                "click #DeleteRule": "deleteRule",
                "click #help":"help"

            },
        	initialize: function(options){
                
        		 var self = this;
                
                //console.log(options);
                
                var model = this.model;
                this.attr = options.attr;
                this.parentModel = options.parentModel;

                var val = "";
                
                var setKey = "";
                
                for (var key in model){
                    val = model[key];
                    setKey = key;

                }
                
                var Collapse = view.Component(options.component(setKey,Components.RuleEdit(setKey,val)));
                this.component = Collapse;
                
                this.$el[0].appendChild(Collapse.component);
                
                this.setElement(Collapse.component);
                this.render();
        	},
        	render: function(){
        		var elem = this.$el[0].querySelector("#ruleKey");
                
                $(elem).autocomplete({
                    lookup: stylesheet.allStyles,
                    onSelect: function(select){
                        //console.log(select);
                    },
                    beforeRender: function(container){
                        container[0].style.maxHeight = "";
                    }
                });
                //toastr.info("testing");
        		this.applyRule();
        		
        	},
            saveRule: function(){
                
                var ruleKey = this.$el[0].querySelector('#ruleKey').value;
                var ruleValue = this.$el[0].querySelector('#ruleValue').value;

                 var model = this.model;
                 var key, value;
                 for (key in model){
                    value = model[key];
                 }


                 if (key !== "No Rule"){
                 stylesheet.removeRule(this.attr,model,function(err,state,msg){
                    if (err){
                        toastr.error(err);
                        throw new Error(err);
                    }
                    else if (state){
                        toastr.success(msg);
                    }
                    else if (!state && typeof state !== "undefined"){
                        toastr.error(msg);
                    }

                 });
                }
                else {

                }

                var ret = {};

                

                
                ret[ruleKey] = ruleValue;
                
                delete model[key];
                model[ruleKey] = ruleValue;

                var old = {};
                old[key] = value;
                
                
                this.parentModel.trigger('change:rules', this.model,old);
                
                this.applyRule();
            },
            deleteRule: function(){
                
                var model = this.model;
                var key, value;

                for (key in model){
                    value = model[key];
                }

                var msg = "Rule deleted.";
                var error =false;
                
                if (key != "No Rule" || value != "undefined"){
                stylesheet.removeRule(this.attr,this.model,function(err,state,msg){
                    if (err){
                        toastr.error(err);
                        //throw new Error(err);
                    }
                    else if (state){
                        toastr.success(msg);
                    }
                    else if (!state && typeof state !== "undefined"){
                        toastr.error(msg);
                    }

                 });
            }

                this.parentModel.trigger("delete:rules", this.model);
                this.destroyView();

            },
            applyRule: function(){
                var model = this.model;
               
                var elem = this.$el[0].querySelector("#collapseHeader");
                var key, value;

                for (key in model){
                    value = model[key];
                }

                elem.innerText = key;

                if (key !== "No Rule" || value !== "undefined"){
                    stylesheet.addRule(this.attr,model, function(err,state,msg){
                    if (err){

                        toastr.error(err);
                        throw new Error(err);
                    }
                    toastr.success(msg);
                    
                    });
                }
                
                
            },
            destroyView: function() {
                
                // COMPLETELY UNBIND THE VIEW
                this.undelegateEvents();

                this.$el.removeData().unbind(); 

                // Remove view from DOM
                this.remove();  
                Backbone.View.prototype.remove.call(this);

            },
            help: function(e){
                var elem = this.$el[0].querySelector("#ruleKey");
                if (elem.value != "No Rule"){
                    console.log(elem.value);
                    var url = "http://www.w3schools.com/cssref/pr_";
                    if (elem.value.indexOf("font") != -1){
                        url += "font_";
                    }
                    //var url = "http://www.w3schools.com/cssref/pr_border-width.asp";
                    
                    url += elem.value+".asp";
                    var win = window.open(url, '_blank');
                    win.focus();
                }
                else {
                    toastr.warning("Cannot have 'No Rule'!");
                }
                
            }
        });


       

        var StyleData = [

            //{attr:"body *"}, "rules": [{"font-family":"garamond"}], "alias":"body"}
            
        ];
        /*
        var StyleData = [
        	{"Style":"body", rules: ["background-color: red;"]}
        ];
        */
        
        


        (function init(){
            var html = document.getElementsByTagName("html")[0];
            html.style.overflow = "auto";
            
            var styles = new Styles(StyleData);
            var styleListView = new StylesController({collection:styles});
        })();
        
        



	});

    
    });
return dfd.promise();

});