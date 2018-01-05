// git event

define(['globals'], function(globals) {
	
	function add() {
		
		
	}
	
	function list () {

		/*var list = $('.appointments-list');	
		var i = 0;
		$.each(list, function(){
			var l = $(this).children('.patient-pic').length;
		    var c = this.children;
	    	var i;
	    	for (i = 0; i < c.length; i++) {
	    		if (i > 3) {
	    			c[3].className = "hidden-patient";
					c[i].className = "hidden-patient";
				};
	   		}	
		var t = $(this).find('.hidden-patient').length;
		if (t >= 1) {
			$(this).append('<div class="col-lg-2 col-xs-2 extra-patients-circle text-center"></div>');
			p = t-3
			$(this).find('.extra-patients-circle').text('+'+p);
		};
	 	});
	 	$('.extra-patients-circle').click(function(){
	 		//var day = $(this).parent().parent().parent().attr('id').replace(/-/g, '/');
	 		var day = $(this).parent().parent().parent().attr('id');
	 		var clinic = $(this).parent().parent().find('h1').text();
	 		var did = '22';
	 		document.location.href = "#panel/appointments/"+clinic+"/22/"+day;	 		
	 	});*/

		var list = $('.appointments-list');	
		var i = 0;

		$.each(list, function(){

			var l = $(this).children('.patient-pic').length;
			var i;
			for (i = 0; i < this.children.length; i++) {
				if (i > 2) {
		    			//$(this).children('div:nth-child('+3+')').attr("class", "hidden-patient col-lg-3 col-xs-3 patient-pic text-center");
		    			$(this).children('div:nth-child('+i+')').attr("class", "hidden-patient col-lg-3 col-xs-3 patient-pic text-center");
		    		};
		    	}	
		    	var t = $(this).find('.hidden-patient').length;
		    	c = $(this).children(".extra-patients-circle").length;
		    	
		    	if ((t > 0) && (c == 0)) {

		    		$(this).append('<div class="col-lg-3 col-xs-3 extra-patients-circle text-center"></div>');
		    		p = t;
		    		$(this).find('.extra-patients-circle').text('+'+p);

		    	};
		});
		$('.extra-patients-circle').click(function(){
	 		$(this).parent().find('.hidden-patient').slideDown();
			//$(this).parent().find('.hidden-patient').fadeIn(400);
	 		$(this).fadeOut();

	 		$(list).mouseleave(function() {
	 		   $(this).parent().find('.hidden-patient').slideUp();
			   //$(this).children('.hidden-patient').fadeOut();
	           $(this).find('.extra-patients-circle').fadeIn();
			});
	 	});

	 	// function of calendars while there's not a official calendar 
	 	$('.calendar').datepicker({
			inline: true,
			firstDay: 1,
			showOtherMonths: true,
			dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'vie', 'Sab'],
			gotoCurrent: false,
			minDate: +1
		});

		// apponitments, appointment add ajax request 
		$('#appointment-add').on('submit', function(e){
			e.preventDefault;
			var data = $(this).serialize();
			$.ajax({
				type: 'POST',
				url: 'url',
				data: data,
				beforeSend: function(){
					$('#loading').fadeIn(300).delay(500);
				},
				success: function(r){
					$('#loading').fadeOut(300);
				}
			});
			return false;
		});

	}
	function calendar() {

		$('#calendar').datepicker({
			inline: true,
			firstDay: 1,
			showOtherMonths: true,
			dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'vie', 'Sab'],
			gotoCurrent: false,
			minDate: +1
		});
	}

	return {
      add: add,
      list: list,
      calendar: calendar
	}


});
