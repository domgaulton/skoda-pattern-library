$(document).ready(function(){

	if ($('.humanise-slider-content').length) {

		$('.humanise-slider-content').each(function(index){
			var sliderID = "slider"+index;
			$(this).attr("id", sliderID);

			var flkty = new Flickity("#"+sliderID, {		
			  resize: true,
			  contain: false,
			  prevNextButtons: false,
			  pageDots: true,
			  wrapAround: true,
			  draggable: true,
			  autoPlay: false
			});
		})		
	}

	// if ($('#slider1').length) {
	// 	var flkty = new Flickity('#slider1', {		
	// 	  resize: true,
	// 	  contain: false,
	// 	  prevNextButtons: false,
	// 	  pageDots: true,
	// 	  wrapAround: true,
	// 	  draggable: true,
	// 	  autoPlay: false
	// 	});
	// }
	
	// if ($('#slider2').length) {
	// 	var flkty = new Flickity('#slider2', {		
	// 	  resize: true,
	// 	  contain: false,
	// 	  prevNextButtons: false,
	// 	  pageDots: true,
	// 	  wrapAround: true,
	// 	  draggable: true,
	// 	  autoPlay: false
	// 	});
	// }
	
	// if ($('#slider3').length) {
	// 	var flkty = new Flickity('#slider3', {		
	// 	  resize: true,
	// 	  contain: false,
	// 	  prevNextButtons: false,
	// 	  pageDots: true,
	// 	  wrapAround: true,
	// 	  draggable: true,
	// 	  autoPlay: false
	// 	});
	// }

});