define(['globals'], function(globals) {

	function run() {
		signin();		
	}

    function signin() {    	
    	var responseDiv = "#response-login";
    	$('#form-login').validate({
			submitHandler : function(form) {
				$('#form-login .send').attr('disabled', 'disabled');				
				$.ajax({
					type : "POST",
					url : globals.URL + "account/login",
					data : $(form).serialize(),
					timeout : 12000,
					success : function(response) {
						var response = JSON.parse(response);
						console.log(response.response);
						console.log(response.success);
						$('.send').removeAttr("disabled");
						
						switch (response.success) {
							case 1:
								document.location = globals.URL + 'account/identify';
								break;
							case 0:
								var responseHtml = "<div>"+response.response+"</div>";
								$(responseDiv).addClass('warning-response');
								$(responseDiv).fadeIn(500);
								$(responseHtml).hide().appendTo(responseDiv).fadeIn(1000).delay(3000).fadeOut(function() {
									$(responseDiv).fadeOut(500);
								});
								break;
						}						

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
      run: run,
      signin: signin,
    }	
  
});