$(document).ready(function () {
	
	if($('.humanise-sidebar-ctas').length){
		var td = '/en-GB/tools/Pages/book-a-test-drive.aspx';
		var br = '/en-GB/tools/Pages/request-a-brochure.aspx';
		var lt = '/en-gb/live-tour';
		var fr = '/en-GB/find-a-retailer/Pages/find-your-nearest-skoda-retailer.aspx';
		var cc = 'http://cc-cloud.skoda-auto.com/gbr/gbr/en-gb';
		var fc = '/en-GB/tools/finance-calculator';
		var bs = '/en-GB/owners/service-and-maintenance/online-service-booking/Pages/default.aspx';

		var url = window.location.href;
		if ( url.indexOf("kodiaq") > -1 ) {
			var td = '/en-gb/models/kodiaq/test-drive-offer';
			var cc = 'http://cc-cloud.skoda-auto.com/gbr/gbr/en-gb?carline=67518';
		} else if ( url.indexOf("karoq") > -1 ) {
			var td = 'http://www.skoda.co.uk/tools/book-a-test-drive/?source=karoq';
			var cc = 'http://cc-cloud.skoda-auto.com/gbr/gbr/en-gb?carline=66328';
		}

		$('.humanise-sidebar-ctas__icon--test-drive').next().attr('href', td);
		$('.humanise-sidebar-ctas__icon--car-configutator').next().attr('href', cc);
		$('.humanise-sidebar-ctas__icon--live-tour').next().attr('href', lt);
		$('.humanise-sidebar-ctas__icon--brochure-request').next().attr('href', br);
		$('.humanise-sidebar-ctas__icon--find-retailer').next().attr('href', fr);
		$('.humanise-sidebar-ctas__icon--finance-calcualtor').next().attr('href', fc);
		$('.humanise-sidebar-ctas__icon--book-a-service').next().attr('href', bs);

		$('.humanise-sidebar-ctas').mouseenter(function(){
			$('.humanise-sidebar-ctas__link').addClass('active');
		});

		$('.humanise-sidebar-ctas__icon').click(function(){
			console.log('hide');
			$('.humanise-sidebar-ctas__link').toggleClass('active');
		});

		$(window).scroll(function(){
			$('.humanise-sidebar-ctas__link').removeClass('active');
		});

	}
});