define(['globals', 'appassets/stepform', 'appassets/enhance'], function(globals, stepform, enhance) {
	
	function add() {

		//stepform.run();
		//enhance.fieldsfor("schedule");
		start();
		day();
		$('.ui-corner-all').click(function(){
			day();
		});

		$('#add').on('click', function (){
			var day = $('.current-day').children('h3').text();
			var date = $('.current-day').children('h3').text().split(" / ");
			if(($('#InitDate').children('li').length > 0) && ($('#InitDate>li:nth-child(1)').text() != day)) {
				$('#finalDate').find('.placeholder').remove();
				$('#finalDate').append('<li></li>').children('li').text(day);
				$('#finalDate>li:nth-child(3)').remove();
				$('#InitDate>li:nth-child(3)').remove();
				$('#finalDatex').fadeIn(200);
				$('#finalDate').css('border', 'solid 1px #3ED87A');
			}else{	
				$('#InitDate').find('.placeholder').remove();
				$('#InitDate').append('<li></li>').children('li').text(day);
				$('#InitDatex').fadeIn(200);
				$('#InitDate').css('border', 'solid 1px #3ED87A');			
			}
		});

		$('.current-day').draggable({
			appendTo: "body",
			helper: "clone"
		});

		$( ".dropable" ).droppable({
			activeClass: "ui-state-default",
			hoverClass: "ui-state-hover",
			accept: ":not(.ui-state-active)",
			out: function( event, ui ) {
				ui.draggable.remove();
			},
			drop: function( event, ui ) {
				$( this ).find( ".placeholder" ).remove();
				if( $(this).children().length == 1){
					$(this).find('.x').fadeIn(200);
					$(this).css('border', 'solid 1px #3ED87A');	
					$( "<li></li>" ).text( ui.draggable.text()).appendTo(this);
				}else{
					alert("Ya hay unafecha insertada, eliminela para cambiarla");
				}
				$('.step3').children('h5').fadeOut().text("Ahora selecciona la fecha de reintegro").fadeIn(400);
			}
		});

		$('.x').click(function() {
			$(this).parent().find('li').remove();
			$(this).hide();
			$(this).parent().css('border', 'dashed 1px #ccc');	
		});

	}

	function day() {
		
		$('td').on('click', function () {
			var currentDay = parseInt($('.ui-state-active').text());
			var M = parseInt($('.ui-state-active').parent('td').attr('data-month'));
			var currentM = M+1;
			var currentY = parseInt($('.ui-state-active').parent('td').attr('data-year'));
			$('.current-day').children('h3').hide().text(currentDay +" / "+currentM+" / "+currentY).fadeIn(400);
			$('.aleft').hide().fadeIn();
			$('#add').hide().fadeIn();
			day();
		});	

	}

	function start() {

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
      day: day    
	}

});




