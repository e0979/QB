define(['globals', 'assets/handlebars.min', 'assets/jquery.dataTables.min'], function(globals, Handlebars, dataTables) {
	
	function list() {
//		window.location.hash = '#egresos'; 

		console.log("listing");
		//var userObj = globals.getUser;

		/*$.getJSON(URL+"api/get/json/egresos_comprobantes/", function(data) {		
			var TemplateScript = $("#Egresos-Choose-Template").html(); 
	        var Template = Handlebars.compile(TemplateScript);

			$(".all-egresos-choose").append(Template(data)); 
		});*/
		$('#egresos-list').DataTable({
			"processing": 	true,
	        "serverSide": 	true,
	        "paging": 		true,
	  //       "lengthMenu": [10, 100],
			"ajax": URL+'api/get/json/egresos_comprobantes/', //%20/%20/true
			"columns": [{
			    "data": [0,1],
			    "render": function ( data, type, row ) {
			        return row[0] +' '+ row[1];
			    }
			}],
			 /*"columns": [
		         { "data": "id" },
		         { "data": "beneficiario" }	      		    
		     ],*/

			//"render":,
			
		});
	}

	function add(){
		var form = '#form-add-egreso';
		$(form).validate({
			submitHandler : function(form) {
				$('.send').attr('disabled', 'disabled');				
				$.ajax({
					type : "POST",
					url : globals.URL + "egresos/add",
					data : $(form).serialize(),
					timeout : 12000,
					success : function(response) {
							var response = JSON.parse(response);
							console.log(response);
							//console.log(response.post[0].comments[0]);		
							$('.send').removeAttr("disabled");
							window.location.hash = '#relationships/addto/'+response.egreso;
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