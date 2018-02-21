$('.cta__scroll--light, .cta__scroll--dark').click(function(event){
	event.preventDefault();
	$('html, body').animate({
		scrollTop: $(this).offset().top + 100
	}, 800);
	return false;
});