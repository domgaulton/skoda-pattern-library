$('.form-element input, .form-element textarea').keyup(function(){
	var element = $(this);
	var input = element.val();
	if (input.length > 1) {
		element.addClass('complete');
		element.removeClass('error');
	} else if ( input.length == 0 ) {
		element.removeClass('complete')
		element.addClass('error');
	} else {
		element.addClass('complete');
		element.removeClass('error');
	}
})