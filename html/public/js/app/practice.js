define(['globals', 'appassets/stepform', 'appassets/enhance'], function(globals, stepform, enhance) {
	
	function add() {
		
		stepform.run();
		enhance.fieldsfor("practice");
		autocomplete();
	}

	
	function autocomplete() {
	
		$("input[name=clinic]").autocomplete({
				source : URL + "api/autocomplete/json/practices/", //aqui llama al api que retorna el valor de las clinicas guardadas previamente
				minLength : 1,
				delay : 50,
				messages : {
				noResults : '',
				results : function() {
				}
			},
			select: function(event, ui) {
				console.log(ui);
				$("input[name='clinic_id']").val(ui.item.id_value);
			/* var url = ui.item.name;
			 if(url != '#') {
			 location.href = '/blog/' + url;
			 }*/
			 },
			html : true,
			/*        appendTo: '#specialty-input',*/
			// optional (if other layers overlap autocomplete list)
			open : function(event, ui) {
				$(".ui-autocomplete").css("z-index", 1000);
				//$(".ui-autocomplete").css("background", 'red');
			},
		});
	
	}
	//TODO is this function local to PRACTICES or global TO SEARCH?
	function searchLocation () {
		
		$("textarea[name='address']").geocomplete({
		}).bind("geocode:result", function(event, result) {
			//Retener Coordenadas
			$("input[name='address_location']").val(result.geometry.location.k+","+result.geometry.location.D);
			$("input[name='address_url']").val(result.url);
			//result.formatted_address
			console.log(result);			
		}).bind("geocode:error", function(event, status) {
			// $.log("ERROR: " + status);
		}).bind("geocode:multiple", function(event, results) {
			//   $.log("Multiple: " + results.length + " results found");
		});
		
		$("#find").click(function() {
			$("textarea[name='city']").trigger("geocode");
		});
		
	}

	return {
      add: add,
      autocomplete: autocomplete,
      searchLocation: searchLocation
	}

});