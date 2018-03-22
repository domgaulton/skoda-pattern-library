import $ from 'jquery';

$(document).ready(function(){

    var flky = new Flickity('#slider1', {		
      resize: true,
      contain: false,
      prevNextButtons: false,
      pageDots: true,
      wrapAround: true,
      draggable: true,
	  autoPlay: false
    });
	
    var flky = new Flickity('#slider2', {		
      resize: true,
      contain: false,
      prevNextButtons: false,
      pageDots: true,
      wrapAround: true,
      draggable: true,
	  autoPlay: false
    });
	
    var flky = new Flickity('#slider3', {		
      resize: true,
      contain: false,
      prevNextButtons: false,
      pageDots: true,
      wrapAround: true,
      draggable: true,
	  autoPlay: false
    });
	
});