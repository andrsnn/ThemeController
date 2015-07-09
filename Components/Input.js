define(function(require){
	return function(value, id, placeholder, className){

            var elem = "<input ";

            if (id){
                  elem += "id='" + id + "'' ";
            }
            if (className){
                  elem += "class='" + className + "'' ";
            }
            if (placeholder){
                  elem += "placeholder='" + placeholder + "'' ";
            }
            if (value){
                  elem += "value='" + value + "' ";
            }

            elem += "></input>";

            return [elem];
        }
});