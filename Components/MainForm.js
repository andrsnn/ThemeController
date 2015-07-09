define(function(require){
	return function(newCallback, closeCallback, saveCallback){
           
            var NewEvent = {
                  event: {
                        event:"click",
                        callback: newCallback
                  }
            };

            var CloseEvent = {
                  event:{
                        event: "click",
                        callback: closeCallback
                  }
            };

            var SaveCallback = {
                  event: {
                        event: "click",
                        callback: saveCallback
                  }
            };    
            return [
            	"<div class='themeController jumbotron'>",
                        "<div class='modal-header'>",
                              "<div type='button' data-dismiss='modal' aria-hidden='true' class='close'>x</div>",
                              "<h4 class='modal-title'>Header Controller</h4>",
                              "<div ", {tail:true}, "class='modal-footer' style='border-top-width: 0px;'></div>",
                        "</div>",
                        "<div class='modal-footer' style='border-top-width: 0px;'>",
                              "<div ", NewEvent, "class='btn btn-primary' type='button' style='float: left;'>New</div>",
                              "<div class='btn btn-primary' type='button'>Close</div>",
                              "<div class='btn btn-primary' type='button'>Save</div>",
                        "</div>",
                  "</div>"


            ];
        }
});