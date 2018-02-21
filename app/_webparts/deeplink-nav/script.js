if ( $('.humanise-deeplink-nav__item').length ){
	
	// Deep link buttons set up
	$('.humanise-deeplink-nav__item a').click(function() {
		event.preventDefault();
		var scrollID = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(scrollID).offset().top -100
		}, 500);
		
	});

	// Cache selectors outside callback for performance. 
	var item 	= $('.humanise-deeplink-nav');
	var itemTop = item.offset().top -10;

	$(window).scroll(function() {
		item.toggleClass('sticky', $(window).scrollTop() > itemTop);
	});

}
