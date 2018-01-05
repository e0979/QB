//Show hide evreything else
$('#signin').on('shown.bs.modal', function (e) {
	//$('.site-head .temporaryfademe').css('opacity','0');
	/*$('.modal-backdrop').css('opacity','1');
	$('.modal-backdrop').css('background','#3898f9');
	*/ $('.modal-backdrop').addClass('backdrop-signin');
	//Floatlabel
 	//$('input, textarea').jvFloat();
 	floatinput();
	
});

$('#signin').on('hide.bs.modal', function (e) {
	$('.site-head .temporaryfademe').css('opacity','1');
});




$('.register_with_email').click(function(e) {
	var destination = $(this).attr('href');
	$('#registration-panels').scrollTo($(destination), 500);
	registerWithEmail(destination);	
	e.preventDefault();
});




$('#signin .close').click(function(e) {
});
//Approved
$('#register_who_doctor, #register_who_patient').click(function(e) {
	var destination = $(this).attr('href');
	$('#registration-panels').scrollTo($(destination), 500);	
	e.preventDefault();			
});

$('#signin .back').click(function(e) {
	var destination = $(this).attr('href');
	$('#registration-panels').scrollTo($(destination), 500);	
	e.preventDefault();
});



function registerL(parent) {

	$('.datetimepicker').datetimepicker({});	 
	 
	var form = parent + " form";
	//Validate Registry Form
	$(form).validate({
		rules : {
			"email": {
	        	required: true,
	            email: true,
	            remote: {
	            	url: URL+'account/checkregistered/username/',
	                type: 'post'
	            }
	       	},
	       	"birth": { 
	       		required: true,
	       		check_age: true ,
	       	}	       
		},
		messages: {
			email: { remote:jQuery.format("Ya existe un usuario registrado con este correo") },
		},
		//onkeyup: false,
		//onfocusout: false,
		//onclick: false,
		submitHandler : function(form) {
			$('.register-send').attr('disabled', 'disabled');//prevent double send
			$.ajax({
				type : "POST",
				url : URL + "account/process/",
				data : $(form).serialize(),
				timeout : 15000,
				success : function(response) {
					console.log('works' + response);
					$('.form-register').empty();
					$('#response-registration').html(response).fadeIn('fast');
				},
				error : function(response) {
					console.log(response);
					 $('.register-send').removeAttr("disabled");
					 $('#response-registration').html(response).fadeIn('fast');
				}
			});
			return false;
		}
	});

}

// REGISTRATION WITH SOCIAL NETWORKS ( Facebook, Google)
function processSocialRegistration(userobject) {
	
	/*if (userobject.socialnetwork == 'facebook') {
		//Check if already logged in in facebook
		FB.getLoginStatus(function(response) {
		  if (response.status === 'connected') {
		    var uid = response.authResponse.userID;
		    var accessToken = response.authResponse.accessToken;
		    
		    console.log("Lgged in to Facebook and has Authenticated the app");
		    
		    //Skip Registration, just Login user to the app
		    loginSocial(accessToken);		    
		    	
		  } else if (response.status === 'not_authorized') {	 
		  	
		  	//    
		  	console.log("Logged in to Facebook, but has NO authenticated your app");
		  	// Check if registered in okidoc
		  	 // 	if yes
		  	 // 		authorize the app
		  	 //	login
		  	 //  if no, register, authorize and login with no pass?
		  	 
		  	 registrationSocial();
		  	
		  } else {
		   	console.log(" the user isn't logged in to Facebook.");
		   	registrationSocial();
		  }
		 });
		
	} else if (userobject.socialnetwork == 'google') {
	
	}*/
	
    registrationSocial();
    
	function registrationSocial() {
	
		$.ajax({
			type : "post",
			url : URL + "account/checkregistered/username/",
			data : userobject,
			timeout : 15000,
			success : function(response) {
				console.log("Is Registered empty?: "+response);
				//console.log(userobject);
					switch(response) {									
						case 'true': //Usuario nuevo, registrar de modo normal
							processSocial();
						break;
											
						case 'false': //Si esta registrado, actualizar datos de perfil facebook
							$.ajax({
								type : "post",
								url : URL + "account/update/data/",
								data : userobject,
								timeout : 15000,
								success : function(response) {
									console.log('Datos de Redes Actualizados:  ' + response);	
									console.log(userobject);											
									// recibir un true/ false
									loginSocial();
									//TODO Pendiente definir si se cierra la ventana o que ocurre despues de ese paso
									$('#registration-patient').remove();
									$('#response-registration').html(response).fadeIn('fast');
								},
								error : function(response) {
									console.log(response);
									$('.register-send').removeAttr("disabled");
									$('#response-registration').html(response).fadeIn('fast');
								}
							});
						break;
					}
				}
			});
	}
	
	function processSocial(){
		$.ajax({
			type : "post",
			url : URL + "account/process/",
			data : userobject,
			timeout : 15000,
			success : function(response) {
				console.log('Registrado exitosamente via Facebook: ' + response );
				$('#response-registration').html(response).fadeIn('fast');
			},
			error : function(response) {
				console.log(response);
				$('.register-send').removeAttr("disabled");
				$('#response-registration').html(response).fadeIn('fast');
			}
		});
	}
		
	function loginSocial(accesstokn) {

		userobject.accesstoken = accesstokn; //to approve social login
		
		$.ajax({
			type : "POST",
			url : URL + "account/login",
			data : userobject,
			timeout : 15000,
			success : function(response) {
				
				var obj = jQuery.parseJSON(response);
				console.log('asdasd: ' + obj.response);	
														
				//var responseDiv = "#response-login";
				//$('.send').removeAttr("disabled");
				//$(responseDiv).addClass('alert alert-danger');
				switch (obj.response) {
					case 'timeout':
						var htmlz = "<div>¿tienes internet? pacere que hay problemas de conexión</div>";
						/*$(responseDiv).slideDown(500);
						$(htmlz).hide().appendTo(responseDiv).fadeIn(1000).delay(3000).fadeOut(function() {
																		$(responseDiv).slideUp(500);
																	});
																	
																	
																	$(responseDiv).addClass('warning-response');
																	$(responseDiv).slideDown(500);
																	$(htmlz).hide().appendTo(responseDiv).fadeIn(1000).delay(3000).fadeOut(function() {
																		$(responseDiv).slideUp(500);
																	});*/
										
							break;
										
					case 'error':
										
																	var htmlz = "<div>Usuario o Clave incorrecto</div>";
																	/*$(responseDiv).addClass('warning-response');
																	$(responseDiv).fadeIn(500);
																	$(htmlz).hide().appendTo(responseDiv).fadeIn(1000).delay(3000).fadeOut(function() {
																		$(responseDiv).fadeOut(500);
																	});*/
										
						break;
										
					case 'welcome':
						document.location = URL + 'account/identify';
						break;
										
				}
			},
			error : function(obj, errorText, exception) {
				console.log(errorText);
			}
		});
	}		
	
}

function facebookLogin(role) {
	
	FB.login(function(response) {
		if (response.authResponse) {
			console.log('Fetching your information.... ');
			access_token = response.authResponse.accessToken;
			user_id = response.authResponse.userID;
					
			//get FB UID
			console.log(response);
			FB.api('/me', function(userobject) {
						
				FB.api('/me/picture?width=300&height=300', function(fbpicture) {
					user_email = userobject.email;
					userobject.role = role;
					userobject.fbpicture = fbpicture;
					userobject.socialnetwork = 'facebook'; 	
					userobject.accesstoken = access_token;		
					email = userobject.email;	
					
					processSocialRegistration(userobject);
				});
			});
					
		} else {
			//TODO anotar si cierra la ventana
		}
	},{
	scope : 'publish_stream,email,user_birthday,user_location'
	});
}


