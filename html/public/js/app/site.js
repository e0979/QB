define(['globals', 'appassets/enhance', 'app/search', 'app/login'], function(globals, enhance, search, login ) {
	
	/*function run() {
		var currentLocation = getPage(4);
		i = 4; //for animation
		ii = 1; //for animation

		switch(currentLocation) {
			case "login":
				login.signin();
				break;

			default:

				$(".rotate").textrotator({
					animation : "fade",
					separator : ",",
					speed : 800
				});

				$('.navbar').css('background', 'none');	
	
				$('.datetimepicker').datetimepicker({pickTime: false, });				

				search.run();
				//animateBackground();

				break;
		}
		
	}
	function list () {

		var list = $('.appointments-list');	
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
	 	});
	}

	function animateBackground() {
		
		var $c = $('.flow-container'),
			$w = $(window);
	 
		$c.carouFredSel({
			align: false,
			items: 1,
			width: "300%",
			auto: true,
			scroll: {
				items: 1,
				duration: 30000,
				timeoutDuration: 0,
				easing: 'linear'
			}
		});
		
		$w.bind('resize.example', function() {
			var nw = $w.width();
			if (nw < 990) {
				nw = 990;
			}
			$c.width(nw * 3);
			$c.parent().width(nw);
	 
		}).trigger('resize.example');
		pinanimation();
		setInterval(pinanimation,3750);
	}

	function pinanimation() {
		$('.bg-flow:nth-child(3)>img').css("opacity", "0");
		if(i > 8){
			i = 1;
			if(ii == 1){
				ii++;
			}
		}
		if ((ii == 2)&&(i>3)) {
			ii = 1;
		};

		$('.bg-flow:nth-child('+ii+')>img:nth-child('+i+')').css({
	    	top: function( index, value ) {
	    		return parseFloat( value ) - 50
	    	}
		});
		$('.bg-flow:nth-child('+ii+')>img:nth-child('+i+')').animate({
			opacity: 1,
			"top": "+=50"
		},500) 
		i++;
		console.log(ii + " --> "+i)
	}

	return {
      run: run,
      list: list,
      animateBackground: animateBackground
	}*/

});