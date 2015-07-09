define(function(require){
	return function(headerText){
            
			var handler1 = {
            				tail: true,
            				event: {
            					event: "click",
            					callback: function(elem){
            						return function(e){
            							for (var i = 0; i < elem.length; i++) {
            								$(elem[i]).collapse("toggle");
            							}
            						}
            					},
            					host: "openDiv"
            				}
            			};

            var handler2 = {
            			event: {
            				subscribe: "openDiv"	
            			}
            			
            		};

            return [
            	"<div data-toggle='collapse'>",
            		"<div hook>",
            			"<p", handler1, ">wokring</p>",
            		"</div>",
            		"<div", handler2,">",
            			"<p>sometinghere</p>",
            		"</div>",
            	"</div>"
            ];
        }
});