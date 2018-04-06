$(document).ready(function(){
	
	if ($('.humanise-quote-slider__list').length) {
		var sliderItem = document.querySelectorAll('.humanise-quote-slider__list');
		for (var i=0, numberOfItems = sliderItem.length; i < numberOfItems; i++) {
			var currentSliderItem = sliderItem[i];
			new Flickity(currentSliderItem, {
				resize: true,
				contain: false,
				prevNextButtons: false,
				pageDots: true,
				wrapAround: true,
				draggable: true,
				autoPlay: false
			});
		}
	}
	
});