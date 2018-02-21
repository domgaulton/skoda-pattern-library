//requires Slider script - slider/script.js

jQuery(document).ready(function($) {
  var imageSlider = $('.slider-image-selector').unslider({
    nav: function(index, label) {
      return '<h4 class="title--caption-title">' + label + '</h4>';
    },
    animation: 'fade'
  }) 
});