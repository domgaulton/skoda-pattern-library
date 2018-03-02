$('.pattern-library-hover').mouseover(function(){
	$('.pattern-library-nav').toggleClass('hide-nav');
	$('.pattern-library-body').toggleClass('hide-nav');
})

$('.nav-show-hide').click(function(){
	$('.pattern-library-nav').toggleClass('hide-nav');
	$('.pattern-library-body').toggleClass('hide-nav');
});

if ( window.location.href.indexOf("?hide-title") > -1 ) {
	$('.pattern-library-header').hide();
}