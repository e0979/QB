define(['globals', 'assets/handlebars.min', 'assets/fileupload/jquery.fileupload', 'app/boards'], function(globals, Handlebars, fileuploader, Boards ) {

	function add(boardId) {
		console.log("Add to Board: "+boardId);
		if (boardId == ""){
			Boards.list();
		} else {
			var i=0;
		    var filename= [];
		    var ul = $('#fileupload ul');
			var jqXHR = $('#fileupload').fileupload({
					dropZone: $('body'),
					sequentialUploads: false,
					url: globals.URL+'posts/add/'+boardId,
					add: function (e, data) {	        	
		            	var tpl = $('');
		            	 data.context = tpl.appendTo(ul);
		            	 //temporizador();
		            	 // Automatically upload the file once it is added to the queue
		            	 var jqXHR2 =  data.submit() ;
		            	 jqXHR2.abort
		   			},
		   			progress: function(e, data){	
		       		// Calculate the completion percentage of the upload
		      			var progress = parseInt(data.loaded / data.total * 100, 10);
		      			$('#conversion').show();
		     		},
		     		fail:function(e, data){
			            // Something has gone wrong!
			            if (data.errorThrown === 'abort') {
			            	$('#conversion').hide();
			            } else if(data.result['status']=="error"){
			            	alert(data.result['error']);
			            }
			          	//console.log(data.errorThrown + ' /n ' + data.textStatus + ' '+data.jqXHR.responseText);
				       //	data.context.addClass('error');
				       //	data.abort();
		            },
		            done: function (e, data) {	        	
		        		//clearTimeout(timer);
		        		$('#conversion').hide();
		        		if(data.result['status']=="error"){
		        			if (data.result['error']=="Incorrect type of file."){
		        				alert("Tipo de Archivo No permitido");
		        			}
		        			console.log(data.result['error']);
		        		} else { //is "success"
		        			$.each(data.files, function (index, file) {
				  				//var filename = data.result['fileeditedname'];
				  				var postResult = JSON.parse(data.result);
				  				//$.post(globals.URL+"posts/complete/"+filename.fileeditedname, function(data) {	
				  				//	$('#postpop').hide().html(data).fadeIn('slow');
									//window.location.hash = '#posts/edit/id'; Alternative, edit alone
								window.location.hash = '#posts/board/'+postResult.board+'/modal/'+postResult.post;

								//});
				   			 });
				    	}			   
		            	//console.log(data.jqXHR.responseText + ' ' + data.textStatus + ' '+data.files + ' '+data.url);
		        	},
			});
			$('#cancelar').click(function (e) { //button.cancel
				//This doesnt work jqXHR.abort();
				location.reload();
			});
		}
	}

	function run() {
		$('.post .image, .post .comment-action').click( function(){
			var postId 	 = $(this).data('post');
			//EDIT
			edit(postId);
		});
	}
	
	function commentsValidate(){
		$('.comment-submit').on('click', function(e) {
			form 	= $(this).parent().parent("form");
			postId 	= $(form).data("post");
			//asz q	-=0console.log(form);
			$(form).validate({
				submitHandler : function(form) {
					$(this).closest('.send').attr('disabled', 'disabled');				
					$.ajax({
						type : "POST",
						url : globals.URL + "comments/add/"+postId,
						data : $(form).serialize(),
						timeout : 12000,
						success : function(response) {
							var response = JSON.parse(response);
							//var response = JSON.stringify(response);
							console.log(response.post[0].comments[0]);		
							$(this).closest('.send').removeAttr("disabled");

							var NewComment = $('#SingleComment-Template').html();
					        var Template = Handlebars.compile(NewComment);
					        $("#popDetailBox-"+postId+" #commentsList").append(Template(response.post[0].comments[0]));
					        $('[name="text"]').val("");
					    },
						error : function(obj, errorText, exception) {
							console.log(errorText);
						}
					});
					return false;
				}
			});
			//e.preventDefault();
		});
	}
	
	function edit(postId){

		//get From from URL
		var fromValue = globals.hash()[2];
		//window.location.hash = '#posts/board/'+fromValue+'/modal/'+postId;
			
		var Modal = $("#popDetailBox-"+postId);
		var findPrevious = $('.all-posts').find(Modal);
			
		if (findPrevious.length < 1) {
			//Load Data			
			$.when($.getJSON(globals.URL+"api/post/json/"+postId, function (data) {
			    var TemplateScript = $("#Modal-Template").html(); 
			    var Template = Handlebars.compile(TemplateScript);
			    Handlebars.registerPartial("commentsPartial", $("#Comments-Template").html());
			    Handlebars.registerPartial("commentPartial", $("#SingleComment-Template").html());
				$(".all-posts").append(Template(data));
			}, function () {
			    
			})).done( function(){
				//console.log('done');
				$("#popDetailBox-"+postId).modal('show');
				commentsValidate();
			});
			


		} else {
			console.log('Si hay PRevio'+postId);
			$(Modal).modal('show');
			
		}
		
	}

	return {
		add: add,
		edit: edit,
		run: run
	}
});