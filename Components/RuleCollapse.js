define(function(require){
//define(["../View/View"], function (View){
      
      var AttrEdit = require("./AttrEdit");
      var Collapse = require("./Collapse");

	return function(ruleAlias, rule){

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
                        host: "openDiv1"
                  }
            };

            var collapser = {
                  event: {
                        subscribe: "openDiv1"
                  }
            };
            ruler = ruleAlias || rule;
            
            var ret = [
                  
            	"<div class='panel panel-default'>",
                        "<div class='panel-heading'>",
                              "<h4 class='panel-title'>",
                                    

                                    "<div ", collapseHandler," id='header' aria-expaned='false' class='collapsed'>",ruler,"</div>",
                              "</h4>",
                        "</div>",
                        "<div", collapser," id='collapser' class='panel-collapse collapse' aria-expaned='false'>",
                              "<div style='padding-left: 15px; padding-right: 15px; margin-top: 15px;' class='panel-body>",
                                    Collapse("Modify Rule", AttrEdit(ruleAlias, rule)),
                                    
                                    "<div",{tail: true},"></div>",
                                    "<div style='padding-bottom:10px;'>",
                                    "<div style='float:left;' class='btn btn-primary' id='deleteStyle' type='button'>Delete</div>",
                                    "<div class='btn btn-primary' id='SaveAllRules' type='button'>Save All Rules</div>",
                                    "<div class='btn btn-primary' id='rule' type='button'>New Rule</div>",
                                    "</div>",
                                    
                              "</div>",
                        "</div>",
                  "</div>"
            ];


            return ret;

        }
});