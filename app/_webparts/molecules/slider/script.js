$(document).ready(function(){
	
	if ($('#slider1').length) {
		
		var flkty = new Flickity('#slider1', {		
			resize: true,
			contain: false,
			groupCells: true,
			prevNextButtons: true,
			pageDots: false,
			wrapAround: true,
			draggable: true,
			autoPlay: false,
			on: {
				ready: function() {
					$(".flickity-button").wrapAll("<div class='flickity-buttons'></div>");
					var imageHeight = $("#slider1 .humanise-slide__img").height();
					$(".flickity-buttons").height(imageHeight);
					
					$(window).resize(function() {
					  imageHeight = $("#slider1 .humanise-slide__img").height();
					  $(".flickity-buttons").height(imageHeight);
					});
				}
			}
		});
	
	}
	
});


