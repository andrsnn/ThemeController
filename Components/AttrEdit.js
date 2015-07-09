define(function(require){
      var Input = require("./Input");
	return function(inputOneValue, inputTwoValue, inputOneId, inputTwoId){


            return [
            	
                  '<div class="form-group">',
                        '<div class="header control-label">Alias Name</div>',                        
                        '<input id="aliasInput" class="form-control" placeholder="Alias Name" value="',inputOneValue,'"></input>',   
                        '<div class="header control-label">Rule</div>',
                        '<input id="ruleInput" class="form-control" placeholder="Rule Name" value="',inputTwoValue,'"></input>',   
                        
                        "<div class='btn btn-primary' id='SaveStyle' type='button'>Save</div>",
                  '</div>'
            ];
        }
});