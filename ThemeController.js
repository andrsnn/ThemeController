define(function(require){


	var View = require("../bower_components/View/View");
    var Backbone = require("../bower_components/backbone/backbone-min.js");
    //var View = require("")
	var view = new View();

	//var hashmap = require("./hashmap/hashmap");
	var StyleSheet = require("./StyleSheet/StyleSheet");
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


	var Components = {
		MainForm: require("./Components/MainForm"),
		Collapse: require("./Components/Collapse"),
		RuleCollapse: require("./Components/RuleCollapse"),
        AttrEdit: require("./Components/AttrEdit"),
        RuleEdit: require("./Components/RuleEdit")
        //CollapseExtend: require("./Components/CollapseExtend")

	};

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

	return function(options){
		


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

        //main controller
        var StylesController = Backbone.View.extend({
        	el: mainform.component,
        	component: mainform,
        	events: {
        		"click":"clickEvent"
        	},
        	initialize: function(){

        		this.render();
        		
        	},
        	render: function(){
        		this.collection.on("add", this.addStyle, this);
                this.collection.on("change", this.collectionChange, this);
        		
        		var self = this;
        		
        		this.collection.models.forEach(function(elem,index){
        			
        			
        			self.addStyle(elem);
        		});

        		return this;
        	},
            collectionChange: function(x){
                //send ajax
                console.log(x);
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
        	clickEvent: function(e){

        		//this.processStyle()
        		if (e.target.innerText === "NEW"){
                    
        			this.collection.add({});
        		}
        		
        		
        		//console.log(e);
        	}

        });
        
        //sub controller
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

                //self.addSubRules(this.model.attributes);
                
                /*
                this.model.attributes.forEach(function(elem,index){
                    self.addSubRules();
                });
*/
        		
        	},
        	render: function(){
        		this.add();
        		
        	},
            ruleChanged: function(newObj,old){
               var found = this.model.attributes.rules.indexOf(newObj);

               //if newObj isn't on rules array that means new rule
               if (found === -1){
                this.model.attributes.rules.push(newObj);
               }

            },
            ruleDelete: function(model){
                var rules = this.model.attributes.rules;
                rules.splice(rules.indexOf(model),1);
                
            },
            modelChanged: function(x){
                
                var header = this.$el[0].querySelector("#header");
                var model = this.model.attributes;

                header.innerText = typeof model.alias === "undefined"
                    || model.alias === "undefined" || model.alias.length == 0 
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
                
                if (typeof model.attr === "undefined"
                    || model.attr.length == 0){
                    return;
                }

                stylesheet.addAttribute(model.attr, function(err,state,msg){
                    if (err){
                        throw new Error(err);
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

                if (typeof model.attr !== "undefined"){
                     stylesheet.removeAttribute(model.attr,function(err,state,msg){
                    if (err){
                        
                        throw new Error(err);
                    }
                    if (state){
                        toastr.success(msg);
                    }
                    else if (!state && typeof state !== "undefined"){
                        
                        toastr.error(msg);
                    }

                 });
                }
                
               if (typeof model.rules === "undefined"){
                    this.model.set({attr:ruleInput, alias: aliasInput, rules: []})
               }    
               else {
                    this.model.set({attr:ruleInput, alias:aliasInput});
               }

                
                this.add();
                


            },
            deleteStyle: function(e){
                console.log(e);
            }
        });
    
        //sub sub controller
        var StyleRuleController = Backbone.View.extend({
        	events: {
                //"click #rule": "addRuleClick",
                "click #SaveRule": "saveRule",
                "click #DeleteRule": "deleteRule"

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
                 
                 stylesheet.removeRule(this.attr,model,function(err,state,msg){
                    if (err){
                        throw new Error(err);
                    }
                    else if (state){
                        toastr.success(msg);
                    }
                    else if (!state && typeof state !== "undefined"){
                        toastr.error(msg);
                    }

                 });

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
                if (key !== "No Rule" || value !== "undefined"){
                stylesheet.removeRule(this.attr,this.model,function(err,state,msg){
                    if (err){
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
                        throw new Error(err);
                    }
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

            }
        });


       

        var StyleData = [
            {attr:"div div", "rules": [{"background-color": "red"}], "alias":""}
            
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
        
        



	}

});