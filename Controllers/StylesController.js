define([],function(){
    return function(){
        debugger;
        //Theme Creator controller
        return StylesController = Backbone.View.extend({
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
                var self = this;
                var altDown = false;
                var downArrow = false;
                var upArrow = false;
                var shiftDown = false;
                document.addEventListener("keydown", function(e){
                    console.log(e.which);
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
                        console.log('trig');
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
                
                


                

//                var encodedString = btoa(string);
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
    }
});