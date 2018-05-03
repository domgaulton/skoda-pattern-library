$(document).ready(function () {
	
	if($('.humanise-sidebar-ctas').length){
		var td;
		var cc;

		var url = window.location.href;
		if ( url.indexOf("kodiaq") > -1 ) {
			var td = '/en-gb/models/kodiaq/test-drive-offer';
			var cc = 'http://cc-cloud.skoda-auto.com/gbr/gbr/en-gb?carline=67518';
		} else if ( url.indexOf("karoq") > -1 ) {
			var td = '/en-GB/tools/book-a-test-drive/?source=karoq';
			var cc = 'http://cc-cloud.skoda-auto.com/gbr/gbr/en-gb?carline=66328';
		} else if ( url.indexOf("octavia") > -1 ) {
			var td = '/en-GB/tools/book-a-test-drive/?source=octaviahatch';
			var cc = 'http://cc-cloud.skoda-auto.com/gbr/gbr/en-gb?carline=68308';
		}

		$('.humanise-sidebar-ctas__icon--test-drive').next().attr('href', td);
		$('.humanise-sidebar-ctas__icon--car-configutator').next().attr('href', cc);

		$('.humanise-sidebar-ctas__icon').mouseenter(function(){
			$('.humanise-sidebar-ctas__link').addClass('active');
		});

		$('.humanise-sidebar-ctas__icon').click(function(){
			$('.humanise-sidebar-ctas__link').toggleClass('active');
		});

		$(window).scroll(function(){
			$('.humanise-sidebar-ctas__link').removeClass('active');
		});

	}
});