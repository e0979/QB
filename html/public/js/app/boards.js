define(['globals', 'assets/handlebars.min'], function(globals, Handlebars) {
	
	function list() {
//		window.location.hash = '#boards'; 

		console.log("listing");
		var userObj = globals.getUser;

		$.getJSON(URL+"api/boards/json/from/"+userObj.userdata.id, function(data) {		
			var TemplateScript = $("#Board-Choose-Template").html(); 
	        var Template = Handlebars.compile(TemplateScript);

			$(".all-boards-choose").append(Template(data)); 
		});
	}

	function add(){
		var form = '#form-add-board';
		$(form).validate({
			submitHandler : function(form) {
				$('.send').attr('disabled', 'disabled');				
				$.ajax({
					type : "POST",
					url : globals.URL + "boards/add",
					data : $(form).serialize(),
					timeout : 12000,
					success : function(response) {
							var response = JSON.parse(response);
							console.log(response);
							//console.log(response.post[0].comments[0]);		
							$('.send').removeAttr("disabled");
							window.location.hash = '#relationships/addto/'+response.board;
							/*var NewComment = $('#SingleComment-Template').html();
					        var Template = Handlebars.compile(NewComment);
					        $("#popDetailBox-"+postId+" #commentsList").append(Template(response.post[0].comments[0]));
					        $('[name="text"]').val("");*/
					},
					error : function(obj, errorText, exception) {
						console.log(errorText);
					}
				});
				return false;
			}
		});
	}


	return {
		list: list,
		add: add
	}

});