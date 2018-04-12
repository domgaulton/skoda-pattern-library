$('.cta-scroll').click(function(){
  var offset = $(this).offset().top;
  window.scrollBy({ 
    top: offset, // could be negative value
    left: 0, 
    behavior: 'smooth' 
  });
})