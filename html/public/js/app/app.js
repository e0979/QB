define(['globals', 'assets/handlebars.min', 'app/posts'], function(globals, Handlebars, Posts) {

	function boards() {
		console.log("Board-Template");
		window.location.hash = '#boards'; //for binding to back state TODO could add to url params for refreshing maybe
		
		var userObj = globals.getUser;

		$.getJSON(globals.URL+"api/boards/json/from/"+userObj.userdata.id, function(data) {
			var TemplateScript = $("#Board-Template").html(); 
	        var Template = Handlebars.compile(TemplateScript);
			$(".all-boards").append(Template(data)); 
		});		
	}

	function posts(from,value,modalMode,modalValue) {

		$.getJSON(URL+"api/posts/json/board/"+"/"+value, function(data) {
			var TemplateScript = $("#Post-Template").html(); 
	        var Template = Handlebars.compile(TemplateScript);
			$(".all-posts").append(Template(data)); 
			Posts.run();
		});

		if (modalMode == 'modal') {			
           	Posts.edit(modalValue); //Show Modal		
			window.location.hash = '#posts/'+from+'/'+value+'/'+modalMode+'/'+modalValue;
		} else {
			window.location.hash = '#posts/'+from+'/'+value; //for binding to back state TODO could add to url params for refreshing maybe
		}		
	}	

	return {
		boards: 	boards,
		posts: 		posts,
	}

});