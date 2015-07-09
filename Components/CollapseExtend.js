define(function(require){
      var View = require("../View/View");
      var view = new View();
      var collapse = require("./CollapseExtend");

	return function(collapseName){                        
        
        
        return view.extend({
            element:[
                  "<div class='panel panel-default'>",
                        "<div class='panel-heading'>",
                              "<h4 class='panel-title'>",
                                    "<div id='collapseHeader' aria-expaned='false'>",collapseName,"</div>",
                              "</h4>",
                        "</div>",
                        "<div id='collapser' class='panel-collapse collapse' aria-expaned='false'>",
                              "<div class='panel-body>",
                                    "<div",{tail: true},">",  
                                    collapse(collapseName),
                                    "</div>",
                              "</div>",
                        "</div>",
                  "</div>"
            ],
            events: {
                  "click #collapseHeader":"toggle"
            },
            toggle: function(e){
                  if (e){
                        e.stopPropagation();      
                  }
                  
                  


                  $(this.component.querySelector("#collapser")).collapse("toggle");
                  /*
                  for (var i = 0; i < elem.length; i++) {
                                          $(elem[i]).collapse("toggle");
                                    }
                  */
            }

        });
  }

});