$(document).ready(function(){
	
	if ($('.humanise-slider__list--one-item').length) {
		
		var sliderItem = document.querySelectorAll('.humanise-slider__list--one-item');
		for (var i=0, numberOfItems = sliderItem.length; i < numberOfItems; i++) {
			var currentSliderItem = sliderItem[i];
			new Flickity(currentSliderItem, {
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
						$(".humanise-slider__list--one-item .flickity-button").wrapAll("<div class='flickity-buttons'></div>");
						var imageHeight = $(".humanise-slider__list--one-item .humanise-slide__img").height();
						$(".humanise-slider__list--one-item .flickity-buttons").height(imageHeight);
											
						$(window).resize(function() {
						  imageHeight = $(".humanise-slider__list--one-item .humanise-slide__img").height();
						  $(".humanise-slider__list--one-item .flickity-buttons").height(imageHeight);
						});
											
					},
					change: function() {
						$(".humanise-slider__list--one-item .flickity-button").removeClass('show').addClass('hide');
					},
					settle: function() {
						$(".humanise-slider__list--one-item .flickity-button").removeClass('hide').addClass('show');
					}
				}
			});
		}
	
	}
	
});


