$(window).scroll(function(){
	// This is then function used to detect if the element is scrolled into view
	function elementScrolled(elem) {
		if ($('.humanise-parallax__item').length) {
			var docViewTop = $(window).scrollTop();
			var docViewTop = docViewTop + 1800;

			var elemTop = $(elem).offset().top;

			return ( (elemTop <= docViewTop) );
		}
	}

	if (elementScrolled('.humanise-parallax') ) {
		var x = $(window).scrollTop() + $('.humanise-parallax__item').outerHeight() - $('.humanise-parallax').offset().top + 200;

		// console.log( 'scroll top: '+ $(window).scrollTop() );
		// console.log( 'offset top: '+ $('.humanise-images').offset().top );
		// console.log( 'outerHeight: '+ $('.humanise-images__heading').outerHeight() );
		
		// console.log(x);

		var x = x+200;
		$('.itemA').css('top', -(x*.3)+'px');
		$('.itemB').css('top', (x*0.3)+'px');
	}
});