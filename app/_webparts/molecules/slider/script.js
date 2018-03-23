$(document).ready(function(){
	
	if ($('#slider1').length) {
		
		var twoCellCarousel = new Flickity('#slider1', {		
			resize: true,
			contain: false,
			groupCells: 2,
			prevNextButtons: true,
			pageDots: false,
			wrapAround: true,
			draggable: true,
			autoPlay: false,
			on: {
				ready: function() {
					var sliderId = '#' + this.element.id;
					$(sliderId + " .flickity-button").wrapAll("<div class='flickity-buttons'></div>");
					var imageHeight = $(sliderId + " .humanise-slide__img").height();
					$(sliderId + " .flickity-buttons").height(imageHeight);					
					
					$(window).resize(function() {
					  imageHeight = $(sliderId + " .humanise-slide__img").height();
					  $(sliderId + " .flickity-buttons").height(imageHeight);
					  resetGroupCells(twoCellCarousel);
					});
					
					function resetGroupCells(carousel) {
						if (window.matchMedia('screen and (max-width: 768px)').matches) {
							carousel.options.groupCells = 1;
							console.log(carousel.options.groupCells);
							
						} else {
							carousel.options.groupCells = 2;
							console.log(carousel.options.groupCells);
						}						
					}
					
					resetGroupCells(this);
					this.resize();					
				}
			}
		});
	
	}
	
	if ($('#slider2').length) {
		
		var oneCellCarousel = new Flickity('#slider2', {		
			resize: true,
			contain: false,
			groupCells: 1,
			prevNextButtons: true,
			pageDots: false,
			wrapAround: true,
			draggable: true,
			autoPlay: false,
			on: {
				ready: function() {
					var sliderId = '#' + this.element.id;
					$(sliderId + " .flickity-button").wrapAll("<div class='flickity-buttons'></div>");
					var imageHeight = $(sliderId + " .humanise-slide__img").height();
					$(sliderId + " .flickity-buttons").height(imageHeight);
										
					$(window).resize(function() {
					  imageHeight = $(sliderId + " .humanise-slide__img").height();
					  $(sliderId + " .flickity-buttons").height(imageHeight);
					});
										
				}
			}
		});
	
	}
	
});


