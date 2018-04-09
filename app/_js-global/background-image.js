if ( $('[data-bg-image]').length || $('[data-bg-image-dark]').length ) {
	$('[data-bg-image]').each(function() {
		var src = $(this).attr('data-bg-image');
		$(this).css('background-image','url('+src+')');
	});

	$('[data-bg-image-dark]').each(function() {
		var src = $(this).attr('data-bg-image-dark');
		$(this).css('background-image','linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('+src+')');
	});
};