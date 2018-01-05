define(['globals'], function(globals) {
	
	function run() {
		//Get Session
		var accessArray = window.location.pathname.split('/');
    	var accessHash = $.param.fragment();
      	var accessHashPart = accessHash.split('/');

      	var datam = "1";
      	$.ajax({
        	type : "POST",
          	url : globals.URL + "account/getsession",
          	data : $(datam).serialize(),
		  	success : function(response) {
	            var response = JSON.parse(response);
	          	
	          	if(accessArray[4] == "firstlogin" && response.socialnetwork == 1) {
	          		updateEmail();
				}
          	}
      	});
	}

	function updateEmail(){
		
		var responseDiv = "#response";
		var form = '#form-provide-email' 
    	$(form).validate({
			submitHandler : function(form) {
				$('#form-provide-email .send').attr('disabled', 'disabled');				
				$.ajax({
					type : "POST",
					url : globals.URL + "account/update/email",
					data : $(form).serialize(),
					timeout : 12000,
					success : function(response) {
						var response = JSON.parse(response);
						console.log(response.response);
						console.log(response.success);
						$('.send').removeAttr("disabled");
						
						var responseHtml = "<div>"+response.response+"</div>";
						$(responseDiv).addClass('warning-response');
						$(responseDiv).fadeIn(500);
						$(responseHtml).hide().appendTo(responseDiv).fadeIn(1000).delay(3000).fadeOut(function() {
							$(responseDiv).fadeOut(500);
						});
						switch (response.success) {
							case 1:
								document.location = globals.URL + 'account/identify';
								break;
							case 0:
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
    	updateEmail: updateEmail
	}  	
});
/*
$(document).ready(function(e) {

	var $validator = $('#password-update').validate({
		rules : {
			password_old : "required",
			password : {
				minlength : 6
			},
			password_confirm : {
				minlength : 6,
				equalTo : "#password"
			},

		},

		submitHandler : function(form) {

			$('#send').attr('disabled', 'disabled');	//prevent double send

			$.ajax({
				type : "POST",
				url : URL + "account/update/password/",
				data : $(form).serialize(),
				timeout : 25000,
				success : function(response) {
					switch (response) {
						case 'success':
							break;
						default:
							$('#send').removeAttr("disabled");
							break;
					}
					$('#response').html(response);					

				},
				error : function(obj, errorText, exception) {
					console.log(errorText);

				}
			});
			return false;
		}
	});




$('#settings-options').children().children().click(function() {
	var id = $(this).attr("id");

	if ( id == "password") {
		$('#settings-render').load(URL + 'account/settings/password');
	}
	if ( id == "profile") {
		$('#settings-render').load(URL + 'account/settings/profile');
		editable();
	}
	if ( id == "preferences") {
		$('#settings-render').load(URL + 'account/settings/preferences');
	}
	if ( id == "notifications") {
		$('#settings-render').load(URL + 'account/settings/notifications');
	}
	$('#settings-options').children().children('.active').attr("class", "");
	$(this).attr("class", "active");
	//alert('Hola')

})

editable();

});
function editable(){

	//Setting up Edit in line Plugin, be aware there's no url it is sended to
	$('#email').editable({
	    type: 'text',
	    pk: 1,
	    url: '',
	});
	$('#phone').editable({
	    type: 'text',
	    pk: 1,
	    url: '',
	});
	$('#sex').editable({
        prepend: "not selected",
        source: [
        {value: 1, text: 'femenino'},
        {value: 2, text: 'masculino'},
       ],
       type: 'select'
    }); 
    $('#sex').editable({
        prepend: "not selected",
        source: [
        {value: 1, text: 'femenino'},
        {value: 2, text: 'masculino'},
       ],
       type: 'select'
    });
    $('#ensurance').editable({
        prepend: "not selected",
        source: [
        {value: 1, text: 'Seguros Cualitas'},
        {value: 2, text: 'Seguros Altamira'},
        {value: 3, text: 'Seguros El Cabo'},
        {value: 4, text: 'Seguros Alvarado'},
        {value: 5, text: 'Seguros Caracas'},
        {value: 6, text: 'Seguros Mercantil'},
       ],
       type: 'select'
    });
    $('#language').editable({
        prepend: "not selected",
        source: [
        {value: 1, text: 'Español'},
        {value: 2, text: 'English'},
        {value: 3, text: 'Dutch'}
       ],
       type: 'select'
    });  
}

function checkall(){
	$('.select-all').click(function (e) {
		e.preventDefault;
		$(this).parent().find('.checkbox').children().children().prop("checked", true);
	});
	$('.unselect-all').click(function (e) {
		e.preventDefault;
		$(this).parent().find('.checkbox').children().children().prop("checked", false);
	});
}

function profileSend(){
	
}
*/