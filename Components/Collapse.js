define(function(require){
	return function(collapseName){
            var collapseHandler = {
                  event: {
                        event: "click",
                        callback: function(elem){
                              return function(e){
                                    e.stopPropagation();
                                    for (var i = 0; i < elem.length; i++) {
                                          $(elem[i]).collapse("toggle");
                                    }
                              }
                        },
                        host: "openDiv"
                  }
            };

            var collapser = {
                  event: {
                        subscribe: "openDiv"
                  }
            };
            //sub arrays of components
            var insert = Array.prototype.slice.call(arguments, 1);

            return [
            	"<div class='panel panel-default'>",
                        "<div class='panel-heading'>",
                              "<h4 class='panel-title'>",
                                    "<div id='collapseHeader'", collapseHandler, " aria-expaned='false'>",collapseName,"</div>",
                              "</h4>",
                        "</div>",
                        "<div", collapser,"class='panel-collapse collapse' aria-expaned='false'>",
                              "<div class='panel-body>",
                                    "<div",{tail: true},">",  
                                          insert,      
                                    
                                    
                                    "</div>",
                              "</div>",
                        "</div>",
                  "</div>"
            ];
        }
});