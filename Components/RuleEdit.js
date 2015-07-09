define(function(require){
      var Input = require("./Input");
	return function(inputOneValue, inputTwoValue, inputOneId, inputTwoId){


            return [
            	
                  '<div style="padding:10px;" class="form-group">',
                        '<div class="header control-label">Rule Name</div>',                        
                        '<input id="ruleKey" class="form-control" placeholder="Rule Name" value="',inputOneValue,'"></input>',   
                        '<div class="header control-label">Rule Value</div>',
                        '<input id="ruleValue" class="form-control" placeholder="Rule Value" value="',inputTwoValue,'"></input>',   
                        "<div style='float:left;' class='btn btn-primary' id='DeleteRule' type='button'>Delete</div>",
                        "<div class='btn btn-primary' id='SaveRule' type='button'>Save</div>",
                  '</div>'
            ];
        }
});