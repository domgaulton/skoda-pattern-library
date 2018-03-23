$(document).ready(function(){
	
	if ($('#slider1').length) {
		var flkty = new Flickity('#slider1', {		
		  resize: true,
		  contain: false,
		  prevNextButtons: false,
		  pageDots: true,
		  wrapAround: true,
		  draggable: true,
		  autoPlay: false
		});
	}
	
	if ($('#slider2').length) {
		var flkty = new Flickity('#slider2', {		
		  resize: true,
		  contain: false,
		  prevNextButtons: false,
		  pageDots: true,
		  wrapAround: true,
		  draggable: true,
		  autoPlay: false
		});
	}
	
	if ($('#slider3').length) {
		var flkty = new Flickity('#slider3', {		
		  resize: true,
		  contain: false,
		  prevNextButtons: false,
		  pageDots: true,
		  wrapAround: true,
		  draggable: true,
		  autoPlay: false
		});
	}
	
});