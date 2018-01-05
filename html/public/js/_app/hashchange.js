define(function() {
	
	var cache = {
		//'' : $('.default') /*title: "<?= $page->attr['title'] ?>", elem: $('.site-head')*/
	};

	$(window).bind('hashchange', function () {
		var url = $.param.fragment();

		// Hide any visible ajax content.
		$('#desktop').children(':visible').hide();	

		if (cache[url]) {
			cache[url].show();			
			//Prevent desktop to usea .load() method
			/*if (url == 'search'){
				 $('#desktop #search').show();
				 console.log( "is "+ cache[url]);
			} else {
				cache[url].show();
			}*/		
			$('#preloader').fadeOut();
			
		} else {
			
			$('#preloader').show();	
			var active_page = url.split('/');

			
			if (active_page[0] == "") {
				window.location.hash = "#welcome";
			} else {
				cache[url] = $('<div class="view"/>').appendTo('#desktop').load(url, function() {

					$('#preloader').fadeOut();

				});
			}

			
		}
		
	});
	// Trigger and Handle the hash the page may have loaded with
	$(window).trigger('hashchange');		
});