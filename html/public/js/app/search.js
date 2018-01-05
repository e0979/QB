// git event

define(['globals', 'appassets/stepform', 'appassets/enhance'], function(globals, stepform, enhance) {
	
	function run() {

		//searchLocation();
		autocomplete();
		checkSearchView();


		$("input[name=search_term]").on("autocompleteselect", function(event, ui) {
			$("input[name=type]").val(ui.item.type);
		});

		var sendbutton = $('#form-search-doctor .send');
		//Home  Main form Validate and send
		$('#form-search-doctor').validate({
			submitHandler : function(form) {
				//sendbutton.attr('disabled', 'disabled');
				
				//Get Form Vars
				location_f = $('input[name=city_value]').val();
				value = $("input[name=search_term]").val();
				type = $("input[name=type]").val();
				
				searchDoctor(type, value, location_f);
				
				/*$.ajax({
					type : "POST",
					url : URL + "account/process/",
					data : $(form).serialize(),
					success : function(response) {
						console.log('works' + response);
						$('#registration-patient').remove();
						$('#response-registration').html(response).fadeIn('fast');
					},
					error : function(response) {
						console.log(response);
						sendbutton.removeAttr("disabled");
						$('#response-registration').html(response).fadeIn('fast');
					}
					
				});*/
				
				return false;
			}
		});
	}

	function autocomplete() {
	
		$("input[name=search_term]").autocomplete({
		        source: URL+"api/autocomplete/json/",
		        minLength: 2,
		        delay: 100,
		        messages: {
			        noResults: '',
			        results: function() {}
			    },
		      /*  select: function(event, ui) {		        	
		            var url = ui.item.name;
		            if(url != '#') {
		                location.href = '/blog/' + url;
		            }
		        },*/
		        html: true,
				/* appendTo: '#specialty-input',*/
		      	// optional (if other layers overlap autocomplete list)
		        open: function(event, ui) {
		            $(".ui-autocomplete").css("z-index", 1000);
		           //$(".ui-autocomplete").css("background", 'red');
		        },
		        /*close : function (event, ui) {
		        val = $("input[name=search_term]").val();
		         $("input[name=search_term]").autocomplete( "search", val ); //keep autocomplete open by 
		         //searching the same input again
		         $("input[name=search_term]").focus();
		        return false;  
		    }*/
		});
	
	}
	
	function searchLocation() {

		$("input[name='city']").geocomplete({
		//	country : "ve"
		}).bind("geocode:result", function(event, result) {
			$("input[name='city_value']").val(result.name);
		}).bind("geocode:error", function(event, status) {
			// $.log("ERROR: " + status);
		}).bind("geocode:multiple", function(event, results) {
			//   $.log("Multiple: " + results.length + " results found");
		});

		$("#find").click(function() {
			$("input[name='city']").trigger("geocode");
		});

		/*$("#examples a").click(function() {
			$("input[name='city']").val($(this).text()).trigger("geocode");
			return false;
		});*/
	}



	//TODO Revise this two methods "searchDoctor" && "checkSearchView"
	function searchDoctor(type, value, location_f) {
		
		window.location.hash = '#search'; //for binding to back state TODO could add to url params for refreshing maybe
		
		Mark.includes.template_cards = document.getElementById("template-search-filters").firstChild.textContent;
		Mark.includes.template_items = document.getElementById("item-card-list").firstChild.textContent;
		template = "{{template_cards}}{{template_items}}";
		var searchterms = value.match(/\S+/g); //value.split(/\b\s+(?!$)/);

		if (!type) { type = 'all'; } 
		
		var context = $.getJSON(URL+"api/search/"+type+"/"+searchterms ,function(data) { 
			console.log(data);
			
			var context = data;
			$('#results').html(Mark.up(template, context));
					
			//transform or not the Main Form if in details View
			checkSearchView();
			
			//fade each result
			$('.item-card').css('opacity','0');
			$('.item-card').each(function(i) {
				$(this).delay((i++) * 300).fadeTo(500, 1); 
			});	
			//Activate Rating	
			$(".rating").rating(); 	
		});
		
		return false;
	}

	function checkSearchView() {
		
		var currentHash= window.location.hash;
		var hashCheck = currentHash.split('/');
		console.log("Hash check:" +currentHash);
		
		
		//TODO Check for something else in case of #search, otherwise it will trigger the miniform with no results
		if (hashCheck[0] == '#search' || hashCheck[0] == '#doctor') {
			//Set Minimum Form
			$('.site-home').css({
				'margin-top':'20px',
				'min-height': '200px',
				'background-size': 'auto 100%'
			});
			$('.site-home h1').fadeOut();

			$('#results').css({
				'margin-top': '250px',
				'opacity':'1'
			});
		}
		
	}
	


	return {
      run: run,
      autocomplete: autocomplete,
      searchLocation: searchLocation
	}

});





/*
 
 * jQuery('.servicios').on('show.bs.modal', function (e) {		 	
		 		jQuery('.blurme').toggleClass('blured');		 	
		 	});
		 	jQuery('.servicios').on('hidden.bs.modal', function (e) {		 	
		 		jQuery('.blurme').removeClass('blured');
		 	});
 * 
 * */



