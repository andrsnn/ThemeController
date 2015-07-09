define(function(require){
      var View = require("../View/View");
	return function(one){

            var elem = [
            	
                  '<div class="form-group">',
                     one,
                  '</div>'
            ];

            return View.extend({
                  element: elem

            });
        }
});