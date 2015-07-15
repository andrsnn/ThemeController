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
                              "<h4 class='modal-title'>Theme Maker</h4>",
                              "<div ", {tail:true}, "class='modal-footer' style='border-top-width: 0px;'></div>",
                        "</div>",
                        "<div class='modal-footer' style='border-top-width: 0px;'>",
                              "<div ", NewEvent, "class='btn btn-primary' id='newStyle' type='button' style='float: left;'>New Style</div>",
                              "<div class='btn btn-primary' type='button'>Close</div>",
                              "<div class='btn btn-primary' id='loadFile' type='button'>Load File",
                              "<input style='display:none;' type='file'></input>",
                              "</div>",
                              "<div class='btn btn-primary' id='exportCSS' type='button'>Export CSS</div>",
                              "<div class='btn btn-primary' id='exportJSON' type='button'>Export JSON</div>",
                              
                        "</div>",
                  "</div>"


            ];
        }
});