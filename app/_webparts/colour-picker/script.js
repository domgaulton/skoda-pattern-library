//requires Slider script - slider/script.js

jQuery(document).ready(function($) {
  var colourSlider = $('.slider-colour-selector').unslider({
    nav: function(index, label) {
      return '<h4 class="title--caption-title">' + label + '</h4>';
    },
    animation: 'fade'
  })
});