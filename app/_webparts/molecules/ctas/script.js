$('.cta-scroll').click(function(){
  event.preventDefault();
  var offset = $(this).offset().top;
  window.scrollBy({ 
    top: offset + 100, // could be negative value
    left: 0, 
    behavior: 'smooth' 
  });
})